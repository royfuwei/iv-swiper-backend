import _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { NestedCommentDTO } from '../comments/dto/comment.dto';
import { PostDTO, PostNestedCommentDTO } from './dto/post.dto';

@Injectable()
export class PostsService {
  /**
   * 合併 貼文 與 巢狀留言
   * @param posts 貼文
   * @param nestedComments 巢狀留言
   * @param orderByIds 排序貼文id
   * @returns PostNestedCommentDTO[]
   */
  getPostsNestedComments(
    posts: PostDTO[],
    nestedComments: NestedCommentDTO[],
    orderByIds: string[] = [],
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
    orderByIds =
      orderByIds.length > 0 ? orderByIds : posts.map((item) => item.id);
    const results: PostNestedCommentDTO[] = orderByIds.map((id) =>
      _.assign(
        {},
        posts.find((item) => item.id === id),
        {
          comments: nestedCommentsMap.has(id) ? nestedCommentsMap.get(id) : [],
        },
      ),
    );
    return results;
  }
}
