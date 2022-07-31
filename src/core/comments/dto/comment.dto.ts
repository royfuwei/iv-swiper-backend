import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CommentDataDTO {
  @ApiProperty({
    description: '留言內容',
    example: '填寫留言內容',
  })
  @IsString()
  content: string;
}
