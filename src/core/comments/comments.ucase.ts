import _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { CommentsRepo } from './comments.repo';
import { ResCommentDTO, ResNestedCommentDTO } from './dto/comment-res.dto';
import { ReqCommentDataDTO } from './dto/comment-req.dto';
import { CommentDTO } from './dto/comment.dto';
import { FilterQuery } from 'mongoose';
import { CommentsService } from './comments.svc';

@Injectable()
export class CommentsUseCase {
  constructor(
    private readonly commentsRepo: CommentsRepo,
    private readonly commentsSvc: CommentsService,
  ) {}

  /**
   * 取得巢狀留言
   * @param id 留言id
   * @returns ResNestedCommentDTO
   */
  async findNestedCommentById(id: string): Promise<ResNestedCommentDTO> {
    const find = await this.commentsRepo.findById(id);
    const comments = await this.findCommentsByParentId(id);
    const nestedComments = this.commentsSvc.getNestedComments([
      find,
      ...comments,
    ]);
    const result: ResNestedCommentDTO = nestedComments[0];
    return result;
  }

  async findCommentsByParentId(id: string) {
    const filter: FilterQuery<CommentDTO> = {
      parentId: id,
    };
    const results = await this.commentsRepo.findByFilter(filter);
    return results;
  }

  /**
   * 更新留言內容
   * @param id 留言id
   * @param body 留言內容
   * @returns ResCommentDTO
   */
  async updateById(
    id: string,
    body: ReqCommentDataDTO,
  ): Promise<ResCommentDTO> {
    await this.commentsRepo.findById(id);
    const result: ResCommentDTO = await this.commentsRepo.updateById(id, body);
    return result;
  }

  /**
   * 新增留言 回覆留言
   * @param id 留言id
   * @param body 留言內容
   * @returns ResCommentDTO
   */
  async addNestedCommentById(
    id: string,
    body: ReqCommentDataDTO,
  ): Promise<ResCommentDTO> {
    const parentComment = await this.commentsRepo.findById(id);
    const create: CommentDTO = _.assign({}, body, {
      parentId: parentComment.id,
      postId: parentComment.postId,
    });
    const result: ResCommentDTO = await this.commentsRepo.add(create);
    return result;
  }

  /**
   * 刪除留言(非物理刪除)
   * @param id 留言id
   * @returns ResCommentDTO
   */
  async deleteById(id: string): Promise<ResCommentDTO> {
    await this.commentsRepo.findById(id);
    const update: CommentDTO = {
      archived: true,
    };
    const result: ResCommentDTO = await this.commentsRepo.updateById(
      id,
      update,
    );
    return result;
  }
}
