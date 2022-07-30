import { Module } from '@nestjs/common';
import { MGO_DEFAULT_DB, MGO_POST_MODEL } from 'src/constants';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schema/post.schema';
import { PostRepo } from './post.repository';
import { PostUseCase } from './post.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MGO_POST_MODEL,
        schema: PostSchema,
        collection: MGO_POST_MODEL,
      },
    ]),
  ],
  providers: [PostUseCase, PostRepo],
  controllers: [PostController],
})
export class PostModule {}
