import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MGO_COMMENTS_MODEL } from 'src/constants';
import { CommentSchema } from './schemas/comments.schema';

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
  controllers: [CommentsController],
})
export class CommentsModule {}
