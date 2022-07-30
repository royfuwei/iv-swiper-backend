import { Injectable } from '@nestjs/common';
import { PaginatedDTO } from '../../infrastructures/util/paginated.dto';
import { PostRepo } from './post.repository';
import { PostDocument } from './schema/post.schema';

@Injectable()
export class PostUseCase {
  constructor(private readonly postRepo: PostRepo) {}

  async findAllByQuery(): Promise<PaginatedDTO<any>> {
    const data = await this.postRepo.findAllByFilter();
    const result: PaginatedDTO<any> = new PaginatedDTO();
    result.items = data;
    result.total = data.length;
    return result;
  }
}
