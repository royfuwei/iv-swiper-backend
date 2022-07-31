import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostDataDTO {
  @ApiProperty({
    description: '貼文內容',
    example: '填寫貼文內容',
  })
  @IsString()
  readonly content: string;
}
