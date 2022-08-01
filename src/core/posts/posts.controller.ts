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
import { ResPostDTO, ResPostsNestedCommentDTO } from './dto/post-res.dto';
import { PostsUseCase } from './posts.ucase';
import { ReqCommentDataDTO } from '../comments/dto/comment-req.dto';
import { ApiPaginatedResponse } from 'src/infrastructures/util/paginated.dto';
import { PostNestedCommentDTO } from './dto/post.dto';
import { ResCommentDTO } from '../comments/dto/comment-res.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsUseCase: PostsUseCase) {}
  @ApiOperation({
    summary: '取得最多留言的10筆貼文(先HotCode)',
  })
  @ApiPaginatedResponse(PostNestedCommentDTO)
  @Get()
  async findByQuery(): Promise<ResPostsNestedCommentDTO> {
    return this.postsUseCase.findByAggregateComments();
  }

  @ApiOperation({
    summary: '新增貼文',
  })
  @ApiCreatedResponse({ type: ResPostDTO })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addPost(@Headers('uid') uid: string, @Body() body: ReqPostDTO) {
    return this.postsUseCase.addPost(body, uid);
  }

  @ApiOperation({
    summary: '更新貼文內容',
  })
  @ApiOkResponse({ type: ResPostDTO })
  @Patch('/:id')
  async updateById(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() body: ReqPostDTO,
  ) {
    return this.postsUseCase.updateById(id, body);
  }

  @ApiOperation({
    summary: '刪除貼文',
  })
  @Delete('/:id')
  async deleteById(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.postsUseCase.deleteById(id);
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
    @Body() body: ReqCommentDataDTO,
  ) {
    return this.postsUseCase.addRootCommentById(id, body);
  }
}
