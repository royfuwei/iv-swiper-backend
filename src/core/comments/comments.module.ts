import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MGO_COMMENTS_MODEL } from 'src/constants';
import { CommentSchema } from './schemas/comments.schema';
import { CommentsUseCase } from './comments.ucase';
import { CommentsRepo } from './comments.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MGO_COMMENTS_MODEL,
        schema: CommentSchema,
        collection: MGO_COMMENTS_MODEL,
      },
    ]),
  ],
  providers: [CommentsUseCase, CommentsRepo],
  controllers: [CommentsController],
})
export class CommentsModule {}
