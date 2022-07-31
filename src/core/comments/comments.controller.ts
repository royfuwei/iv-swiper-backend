import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParseMongoIdPipe } from 'src/infrastructures/pipe/parse-mongo-id.pipe';
import { ReqCommentDTO } from './dto/comment-req.dto';
import { ResCommentDTO, ResNestCommentDTO } from './dto/comment-res.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  @ApiOperation({
    summary: '取得留言',
  })
  @ApiOkResponse({ type: ResNestCommentDTO })
  @Get('/:id')
  async findById(@Param('id', new ParseMongoIdPipe()) id: string) {
    return {};
  }

  @ApiOperation({
    summary: '新增留言(回覆留言)',
  })
  @ApiCreatedResponse({ type: ResCommentDTO })
  @Post('/:id')
  @HttpCode(HttpStatus.CREATED)
  async addById(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() body: ReqCommentDTO,
  ) {
    return {};
  }

  @ApiOperation({
    summary: '更新留言',
  })
  @ApiCreatedResponse({ type: ResCommentDTO })
  @Patch('/:id')
  async updateById(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() body: ReqCommentDTO,
  ) {
    return {};
  }

  @ApiOperation({
    summary: '刪除留言',
  })
  @Delete('/:id')
  async deleteById(@Param('id', new ParseMongoIdPipe()) id: string) {
    return {};
  }
}
