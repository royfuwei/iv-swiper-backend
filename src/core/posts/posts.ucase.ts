import { Injectable } from '@nestjs/common';
import { PaginatedDTO } from '../../infrastructures/util/paginated.dto';
import { ReqPostDTO } from './dto/post-req.dto';
import { PostsRepo } from './posts.repo';
import { CreatePostDataDTO, PostDTO } from './dto/post.dto';
import _ = require('lodash');
import { ResPostDTO } from './dto/post-res.dto';

@Injectable()
export class PostsUseCase {
  constructor(private readonly postsRepo: PostsRepo) {}

  async findByQuery(): Promise<PaginatedDTO<any>> {
    const data = await this.postsRepo.findByFilter();
    const result: PaginatedDTO<any> = new PaginatedDTO();
    result.items = data;
    result.total = data.length;
    return result;
  }

  async createPost(body: ReqPostDTO, uid: string): Promise<ResPostDTO> {
    const createData: CreatePostDataDTO = _.assign({}, body, { uid });
    const result: ResPostDTO = await this.postsRepo.addPost(createData);
    return result;
  }

  async updateById(id: string, body: ReqPostDTO) {
    const result: ResPostDTO = await this.postsRepo.updateById(id, body);
    return result;
  }

  async deleteById(id: string) {
    const update: PostDTO = {
      archived: true,
    };
    const result = await this.postsRepo.updateById(id, update);
    return result;
  }
}
