import { Module } from '@nestjs/common';
import { AppModule } from 'src/core/app/app.module';
import { MongodbModule } from '../../mongodb/mongodb.module';
import { PostModule } from '../../../core/post/post.module';
import { CommentsModule } from '../../../core/comments/comments.module';

@Module({
  imports: [AppModule, MongodbModule, PostModule, CommentsModule],
})
export class ServerRootModule {}
