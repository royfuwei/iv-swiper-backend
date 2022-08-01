import _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { NestCommentDTO } from '../comments/dto/comment.dto';
import { PostDTO, PostNestCommentDTO } from './dto/post.dto';

@Injectable()
export class PostsService {
  getPostsNestComments(
    posts: PostDTO[],
    nestedComments: NestCommentDTO[],
  ): PostNestCommentDTO[] {
    const nestedCommentsMap: Map<string, NestCommentDTO[]> =
      nestedComments.reduce((pre, cur) => {
        const comments = [];
        const postId = cur.postId;
        if (pre.has(postId)) {
          comments.concat(pre.get(postId));
        }
        comments.push(cur);
        pre.set(postId, comments);
        return pre;
      }, new Map<string, NestCommentDTO[]>());
    const results: PostNestCommentDTO[] = posts.map((item) =>
      _.assign({}, item, { comments: nestedCommentsMap.get(item.id) }),
    );
    return results;
  }
}
