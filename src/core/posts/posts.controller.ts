import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Headers,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ParseMongoIdPipe } from 'src/infrastructures/pipe/parse-mongo-id.pipe';
import { ReqPostDTO } from './dto/post-req.dto';
import {
  ResPostCommentDTO,
  ResPostDTO,
  ResPostsNestCommentDTO,
} from './dto/post-res.dto';
import { PostsUseCase } from './posts.ucase';
import { ReqCommentDTO } from '../comments/dto/comment-req.dto';
import {
  ApiPaginatedResponse,
  PaginatedDTO,
} from 'src/infrastructures/util/paginated.dto';
import { PostNestCommentDTO } from './dto/post.dto';
import { ResCommentDTO } from '../comments/dto/comment-res.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsUseCase: PostsUseCase) {}
  @ApiOperation({
    summary: '取得貼文',
  })
  @ApiPaginatedResponse(PostNestCommentDTO)
  @Get()
  async findByQuery(): Promise<ResPostsNestCommentDTO> {
    return this.postsUseCase.findByQuery();
  }

  @ApiOperation({
    summary: '新增貼文',
  })
  @ApiCreatedResponse({ type: ResPostDTO })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addPost(@Headers('uid') uid: string, @Body() body: ReqPostDTO) {
    return {};
  }

  @ApiOperation({
    summary: '更新貼文內容',
  })
  @ApiOkResponse({ type: ResPostDTO })
  @Patch('/:id')
  async updatePost(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() body: ReqPostDTO,
  ) {
    return {};
  }

  @ApiOperation({
    summary: '刪除貼文',
  })
  @Delete('/:id')
  async deleteById(@Param('id', new ParseMongoIdPipe()) id: string) {
    return {};
  }

  /* create comment by post */
  @ApiOperation({
    summary: '在貼文中根留言',
  })
  @ApiCreatedResponse({ type: ResCommentDTO })
  @Post('/:id/comment')
  @HttpCode(HttpStatus.CREATED)
  async addRootCommentById(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() body: ReqCommentDTO,
  ) {
    return {};
  }
}
