import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  @ApiOperation({
    summary: '條件取得多筆留言',
  })
  @Get()
  async findByQuery() {
    return {};
  }

  @ApiOperation({
    summary: '取得留言',
  })
  @Get('/:id')
  async findById() {
    return {};
  }

  @ApiOperation({
    summary: '新增留言(回覆留言)',
  })
  @Post('/:id')
  @HttpCode(HttpStatus.CREATED)
  async addById() {
    return {};
  }

  @ApiOperation({
    summary: '更新留言',
  })
  @Patch('/:id')
  async updateById() {
    return {};
  }

  @ApiOperation({
    summary: '刪除留言',
  })
  @Delete('/:id')
  async deleteById() {
    return {};
  }
}
