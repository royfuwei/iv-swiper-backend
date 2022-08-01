import { Injectable } from '@nestjs/common';
import { arrayToTree } from 'performant-array-to-tree';
import { CommentDTO, NestCommentDTO } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  getNestedComments(comments: CommentDTO[]): NestCommentDTO[] {
    const nestedComments: NestCommentDTO[] = arrayToTree(comments, {
      id: 'id',
      parentId: 'parentId',
      childrenField: 'children',
      dataField: null,
    }) as NestCommentDTO[];
    return nestedComments;
  }
}
