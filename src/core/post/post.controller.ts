import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PostUseCase } from './post.usecase';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postUseCase: PostUseCase) {}
  @ApiOperation({
    summary: '取得貼文',
  })
  @Get()
  async findAllByQuery() {
    return this.postUseCase.findAllByQuery();
  }

  @ApiOperation({
    summary: '新增貼文',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addPost() {
    return {};
  }

  @ApiOperation({
    summary: '更新貼文內容',
  })
  @Patch('/:id')
  async updatePost() {
    return {};
  }

  @ApiOperation({
    summary: '刪除貼文',
  })
  @Delete('/:id')
  async deleteById() {
    return {};
  }

  /* create comment by post */
  @ApiOperation({
    summary: '在貼文中根留言',
  })
  @Post('/:id/comment')
  @HttpCode(HttpStatus.CREATED)
  async addRootCommentById() {
    return {};
  }
}
