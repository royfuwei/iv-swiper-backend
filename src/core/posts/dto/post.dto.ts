import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsMongoId,
  IsBoolean,
  IsDate,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CommentDTO, NestCommentDTO } from '../../comments/dto/comment.dto';

export class PostDataDTO {
  @ApiProperty({
    description: '貼文內容',
    example: '填寫貼文內容',
  })
  @IsString()
  readonly content: string;
}

export class PostDTO extends PostDataDTO {
  @ApiProperty({
    description: '貼文id',
  })
  @IsString()
  @IsMongoId()
  readonly id: string;
  @ApiProperty({
    description: '貼文者id',
  })
  @IsString()
  readonly uid: string;
  @ApiProperty({
    description: '是否封存',
    default: false,
  })
  @IsBoolean()
  readonly archived: boolean;

  @ApiProperty({
    description: '建立時間',
  })
  @IsDate()
  @Transform((value) => new Date(value.value), { toClassOnly: true })
  readonly creationTime: Date;

  @ApiProperty({
    description: '修改時間',
  })
  @IsDate()
  @Transform((value) => new Date(value.value), { toClassOnly: true })
  readonly modiTime: Date;
}

export class PostCommentDTO extends PostDTO {
  @ApiProperty({
    description: '貼文的根留言',
    isArray: true,
    type: CommentDTO,
  })
  comments: CommentDTO[];
}

export class PostNestCommentDTO extends PostDTO {
  @ApiProperty({
    description: '貼文的巢狀留言',
    isArray: true,
    type: NestCommentDTO,
  })
  @IsArray()
  comments: NestCommentDTO[];
}
