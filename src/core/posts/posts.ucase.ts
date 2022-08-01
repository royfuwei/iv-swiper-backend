import _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { PaginatedDTO } from '../../infrastructures/util/paginated.dto';
import { ReqPostDTO } from './dto/post-req.dto';
import { PostsRepo } from './posts.repo';
import { CreatePostDataDTO, PostDTO } from './dto/post.dto';
import { ResPostDTO } from './dto/post-res.dto';
import { ReqCommentDataDTO } from '../comments/dto/comment-req.dto';
import { CommentsRepo } from '../comments/comments.repo';
import { CommentDTO } from '../comments/dto/comment.dto';
import { ResCommentDTO } from '../comments/dto/comment-res.dto';

@Injectable()
export class PostsUseCase {
  constructor(
    private readonly postsRepo: PostsRepo,
    private commentsRepo: CommentsRepo,
  ) {}

  async findByQuery(): Promise<PaginatedDTO<any>> {
    const data = await this.postsRepo.findByFilter();
    const result: PaginatedDTO<any> = new PaginatedDTO();
    result.items = data;
    result.total = data.length;
    return result;
  }

  /**
   * 新增貼文
   * @param body 貼文內容
   * @param uid 使用者id
   * @returns ResPostDTO
   */
  async addPost(body: ReqPostDTO, uid: string): Promise<ResPostDTO> {
    const createData: CreatePostDataDTO = _.assign({}, body, { uid });
    const result: ResPostDTO = await this.postsRepo.add(createData);
    return result;
  }

  /**
   * 更新貼文
   * @param id 貼文id
   * @param body 更新貼文內容
   * @returns ResPostDTO
   */
  async updateById(id: string, body: ReqPostDTO): Promise<ResPostDTO> {
    const result: ResPostDTO = await this.postsRepo.updateById(id, body);
    return result;
  }

  /**
   * 刪除貼文(非物理刪除)
   * @param id 貼文id
   * @returns
   */
  async deleteById(id: string): Promise<boolean> {
    const update: PostDTO = {
      archived: true,
    };
    const result = await this.postsRepo.updateById(id, update);
    return result.archived;
  }

  /**
   * 新增貼文留言
   * @param id 貼文id
   * @param body 留言內容
   * @returns ResCommentDTO
   */
  async addRootCommentById(
    id: string,
    body: ReqCommentDataDTO,
  ): Promise<ResCommentDTO> {
    const create: CommentDTO = _.assign({}, body, { postId: id, parentId: id });
    const result: ResCommentDTO = await this.commentsRepo.add(create);
    return result;
  }
}
