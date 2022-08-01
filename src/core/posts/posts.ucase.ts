import _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { PaginatedDTO } from '../../infrastructures/util/paginated.dto';
import { ReqPostDTO } from './dto/post-req.dto';
import { PostsRepo } from './posts.repo';
import {
  CreatePostDataDTO,
  PostDTO,
  PostNestedCommentDTO,
} from './dto/post.dto';
import { ResPostDTO } from './dto/post-res.dto';
import { ReqCommentDataDTO } from '../comments/dto/comment-req.dto';
import { CommentsRepo } from '../comments/comments.repo';
import { CommentDTO } from '../comments/dto/comment.dto';
import { ResCommentDTO } from '../comments/dto/comment-res.dto';
import { CommentsService } from '../comments/comments.svc';
import { FilterQuery } from 'mongoose';
import { ObjectId } from 'bson';
import { PostsService } from './posts.service';

@Injectable()
export class PostsUseCase {
  constructor(
    private readonly postsRepo: PostsRepo,
    private commentsRepo: CommentsRepo,
    private commentsSvc: CommentsService,
    private postsSvc: PostsService,
  ) {}

  /**
   * 取得最多留言的10筆貼文
   * @param limit 限制數量(目前先Hotcode 10)
   * @returns PaginatedDTO<PostNestedCommentDTO>
   */
  async findByAggregateComments(
    limit = 10,
  ): Promise<PaginatedDTO<PostNestedCommentDTO>> {
    /* 取得留言數最多的貼文 */
    const aggreCountSortPosts =
      await this.commentsRepo.aggregateCountByPostId();
    const sortAggrePostIds = aggreCountSortPosts.map((item) => item._id.postId);
    const sortAggreObjectIds: ObjectId[] = sortAggrePostIds.map(
      (id) => new ObjectId(id),
    );
    const aggrePosts = await this.postsRepo.findByFilter(
      {
        _id: {
          $in: sortAggreObjectIds,
        },
        archived: false,
      },
      {},
      { limit },
    );
    const aggrePostIds = aggrePosts.map((item) => item.id);
    /* 當最多留言的貼文數量 少於limit，補上數量 */
    const otherLimit = limit - aggrePosts.length;
    let otherPostIds: string[] = [];
    let otherPosts: PostDTO[] = [];
    if (otherLimit > 0) {
      otherPosts = await this.findPostsNINObjectIds(
        sortAggreObjectIds,
        otherLimit,
      );
      otherPostIds = otherPosts.map((item) => item.id);
    }
    /* 貼文合併留言 */
    const sortPostIds = sortAggrePostIds.filter(
      (item) => aggrePostIds.indexOf(item) > -1,
    );
    const mergeSortPostIds = sortPostIds.concat(otherPostIds);
    const posts = aggrePosts.concat(otherPosts);
    const comments = await this.getCommentsByIds(mergeSortPostIds);
    const nestedComments = this.commentsSvc.getNestedComments(comments);
    const postsNestedComments = this.postsSvc.getPostsNestedComments(
      posts,
      nestedComments,
      mergeSortPostIds,
    );
    const result: PaginatedDTO<any> = new PaginatedDTO();
    result.items = postsNestedComments;
    result.total = postsNestedComments.length;
    return result;
  }

  /**
   * 取的ObjectIds 以外的貼文
   * @param ninObjectIds 不包含的ObjectIds
   * @param limit 限制搜尋數量
   * @returns PostDTO[]
   */
  protected async findPostsNINObjectIds(
    ninObjectIds: ObjectId[],
    limit: number,
  ): Promise<PostDTO[]> {
    const otherFilter: FilterQuery<PostDTO> = {
      _id: {
        $nin: ninObjectIds,
      },
      archived: false,
    };
    const otherPosts = await this.postsRepo.findByFilter(
      otherFilter,
      {},
      { limit },
    );
    return otherPosts;
  }

  protected async getCommentsByIds(ids: string[]): Promise<CommentDTO[]> {
    const filter: FilterQuery<CommentDTO> = {
      postId: {
        $in: ids,
      },
    };
    return await this.commentsRepo.findByFilter(filter);
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
    await this.postsRepo.findById(id);
    const result: ResPostDTO = await this.postsRepo.updateById(id, body);
    return result;
  }

  /**
   * 刪除貼文(非物理刪除)
   * @param id 貼文id
   * @returns
   */
  async deleteById(id: string): Promise<boolean> {
    await this.postsRepo.findById(id);
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
    await this.postsRepo.findById(id);
    const create: CommentDTO = _.assign({}, body, { postId: id });
    const result: ResCommentDTO = await this.commentsRepo.add(create);
    return result;
  }
}
