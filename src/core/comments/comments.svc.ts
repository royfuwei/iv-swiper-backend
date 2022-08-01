import _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { CommentDTO, NestedCommentDTO } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  getNestedComments(comments: CommentDTO[]): NestedCommentDTO[] {
    const [rootSet, nestedCommentsMap] =
      this.toParentChildMapWithRoots(comments);
    const tree = this.toTree(rootSet, nestedCommentsMap);
    return tree;
  }

  protected toParentChildMapWithRoots(
    comments: CommentDTO[],
  ): [Set<string>, Map<string, NestedCommentDTO>] {
    const ids = comments.map((item) => item.id);
    const rootSet: Set<string> = new Set();
    const nestedCommentsMap: Map<string, NestedCommentDTO> = new Map();
    for (const comment of comments) {
      const { id, parentId } = comment;
      const newParentId = parentId ? parentId : id;
      const isRootInArr = !parentId || ids.indexOf(parentId) == -1;
      if (isRootInArr) rootSet.add(id);
      const mapHasParentComment = nestedCommentsMap.has(parentId);
      const mapHasComment = nestedCommentsMap.has(id);
      let getMapThisComment: NestedCommentDTO = _.assign({}, comment, {
        children: [],
      });
      if (mapHasComment) getMapThisComment = nestedCommentsMap.get(id);
      let getMapParentComment: NestedCommentDTO;
      if (mapHasParentComment) {
        getMapParentComment = nestedCommentsMap.get(newParentId);
      } else {
        const parentComment = comments.find((item) => item.id === newParentId);
        getMapParentComment = _.assign({}, parentComment, { children: [] });
      }
      if (id !== newParentId) {
        getMapParentComment.children.push(getMapThisComment);
      }
      nestedCommentsMap.set(id, getMapThisComment);
      nestedCommentsMap.set(newParentId, getMapParentComment);
    }
    return [rootSet, nestedCommentsMap];
  }

  protected toTree(
    rootSet: Set<string>,
    nestedCommentsMap: Map<string, NestedCommentDTO>,
  ): NestedCommentDTO[] {
    const results: NestedCommentDTO[] = [];
    for (const rootId of rootSet) {
      const comment = nestedCommentsMap.get(rootId);
      results.push(comment);
    }
    return results;
  }
}
