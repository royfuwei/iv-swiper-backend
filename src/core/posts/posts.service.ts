import _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { NestedCommentDTO } from '../comments/dto/comment.dto';
import { PostDTO, PostNestedCommentDTO } from './dto/post.dto';

@Injectable()
export class PostsService {
  getPostsNestedComments(
    posts: PostDTO[],
    nestedComments: NestedCommentDTO[],
  ): PostNestedCommentDTO[] {
    const nestedCommentsMap: Map<string, NestedCommentDTO[]> =
      nestedComments.reduce((pre, cur) => {
        let comments: NestedCommentDTO[] = [];
        const postId = cur.postId;
        if (pre.has(postId)) {
          comments = pre.get(postId);
        }
        comments.push(cur);
        pre.set(postId, comments);
        return pre;
      }, new Map<string, NestedCommentDTO[]>());
    const results: PostNestedCommentDTO[] = posts.map((item) =>
      _.assign({}, item, {
        comments: nestedCommentsMap.has(item.id)
          ? nestedCommentsMap.get(item.id)
          : [],
      }),
    );
    return results;
  }
}
