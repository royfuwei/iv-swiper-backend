import { Module } from '@nestjs/common';
import { AppModule } from 'src/core/app/app.module';
import { MongodbModule } from '../../mongodb/mongodb.module';
import { PostsModule } from '../../../core/posts/posts.module';
import { CommentsModule } from '../../../core/comments/comments.module';

@Module({
  imports: [AppModule, MongodbModule, PostsModule, CommentsModule],
})
export class ServerRootModule {}
