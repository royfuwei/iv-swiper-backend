import { Module } from '@nestjs/common';
import { MGO_POSTS_MODEL } from 'src/constants';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { PostsRepo } from './posts.repo';
import { PostsUseCase } from './posts.ucase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MGO_POSTS_MODEL,
        schema: PostSchema,
        collection: MGO_POSTS_MODEL,
      },
    ]),
  ],
  providers: [PostsUseCase, PostsRepo],
  controllers: [PostsController],
})
export class PostsModule {}
