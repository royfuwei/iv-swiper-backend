import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsMongoId,
  IsBoolean,
  IsDate,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CommentDTO, NestedCommentDTO } from '../../comments/dto/comment.dto';

export class PostDataDTO {
  @ApiProperty({
    description: '貼文內容',
    example: '填寫貼文內容',
  })
  @IsString()
  content?: string;
}

export class CreatePostDataDTO extends PostDataDTO {
  @ApiProperty({
    description: '貼文者id',
  })
  @IsString()
  uid?: string;
}

export class UpdatePostDataDTO extends PostDataDTO {}

export class PostDTO extends PostDataDTO {
  @ApiProperty({
    description: '貼文id',
  })
  @IsString()
  @IsMongoId()
  id?: string;
  @ApiProperty({
    description: '貼文者id',
  })
  @IsString()
  uid?: string;
  @ApiProperty({
    description: '是否封存',
    default: false,
  })
  @IsBoolean()
  archived?: boolean;

  @ApiProperty({
    description: '建立時間',
  })
  @IsDate()
  @Transform((value) => new Date(value.value), { toClassOnly: true })
  creationTime?: Date;

  @ApiProperty({
    description: '修改時間',
  })
  @IsDate()
  @Transform((value) => new Date(value.value), { toClassOnly: true })
  modiTime?: Date;
}

export class PostCommentDTO extends PostDTO {
  @ApiProperty({
    description: '貼文的根留言',
    isArray: true,
    type: CommentDTO,
  })
  comments: CommentDTO[];
}

export class PostNestedCommentDTO extends PostDTO {
  @ApiProperty({
    description: '貼文的巢狀留言',
    isArray: true,
    type: NestedCommentDTO,
  })
  @IsArray()
  comments: NestedCommentDTO[];
}
