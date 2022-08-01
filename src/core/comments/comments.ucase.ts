import _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { CommentsRepo } from './comments.repo';
import { ResCommentDTO, ResNestCommentDTO } from './dto/comment-res.dto';
import { ReqCommentDataDTO } from './dto/comment-req.dto';
import { CommentDTO } from './dto/comment.dto';

@Injectable()
export class CommentsUseCase {
  constructor(private readonly commentsRepo: CommentsRepo) {}

  /**
   * 取得巢狀留言
   * @param id 留言id
   * @returns ResNestCommentDTO
   */
  async findNestCommentById(id: string): Promise<ResNestCommentDTO> {
    const find = await this.commentsRepo.findById(id);
    const result: ResNestCommentDTO = _.assign({}, find, { children: [] });
    return result;
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
    const result: ResCommentDTO = await this.commentsRepo.updateById(id, body);
    return result;
  }

  /**
   * 新增留言 回覆留言
   * @param id 留言id
   * @param body 留言內容
   * @returns ResCommentDTO
   */
  async addNestCommentById(
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
