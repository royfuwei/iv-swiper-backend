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
import { PostsUseCase } from './posts.ucase';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsUseCase: PostsUseCase) {}
  @ApiOperation({
    summary: '取得貼文',
  })
  @Get()
  async findByQuery() {
    return this.postsUseCase.findByQuery();
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
