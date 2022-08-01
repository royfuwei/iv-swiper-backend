import { Module } from '@nestjs/common';
import { MGO_COMMENTS_MODEL, MGO_POSTS_MODEL } from 'src/constants';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { PostsRepo } from './posts.repo';
import { PostsUseCase } from './posts.ucase';
import { CommentsModule } from '../comments/comments.module';
import { CommentsRepo } from '../comments/comments.repo';
import { CommentSchema } from '../comments/schemas/comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MGO_POSTS_MODEL,
        schema: PostSchema,
        collection: MGO_POSTS_MODEL,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: MGO_COMMENTS_MODEL,
        schema: CommentSchema,
        collection: MGO_COMMENTS_MODEL,
      },
    ]),
    CommentsModule,
  ],
  providers: [PostsUseCase, PostsRepo, CommentsRepo],
  controllers: [PostsController],
})
export class PostsModule {}
