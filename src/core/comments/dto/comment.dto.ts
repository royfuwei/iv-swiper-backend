import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsMongoId,
  IsBoolean,
  IsDate,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CommentDataDTO {
  @ApiProperty({
    description: '留言內容',
    example: '填寫留言內容',
  })
  @IsString()
  content: string;
}

export class CommentDTO extends CommentDataDTO {
  @ApiProperty({
    description: '留言id',
  })
  @IsString()
  @IsMongoId()
  readonly id: string;
  @ApiProperty({
    description: '貼文id',
  })
  @IsString()
  @IsMongoId()
  readonly postId: string;
  @ApiProperty({
    description: '上層留言id',
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly parentId?: string;
  @ApiProperty({
    description: 'userid',
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

export class NestCommentDTO extends CommentDTO {
  @ApiProperty({
    description: '巢狀留言',
    isArray: true,
    type: [NestCommentDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NestCommentDTO)
  children: NestCommentDTO[];
}
