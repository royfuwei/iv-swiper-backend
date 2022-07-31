import { Injectable } from '@nestjs/common';
import { PaginatedDTO } from '../../infrastructures/util/paginated.dto';
import { PostsRepo } from './posts.repo';

@Injectable()
export class PostsUseCase {
  constructor(private readonly postsRepo: PostsRepo) {}

  async findByQuery(): Promise<PaginatedDTO<any>> {
    const data = await this.postsRepo.findAllByFilter();
    const result: PaginatedDTO<any> = new PaginatedDTO();
    result.items = data;
    result.total = data.length;
    return result;
  }
}
