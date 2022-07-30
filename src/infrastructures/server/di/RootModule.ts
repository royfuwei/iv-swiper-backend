import { Module } from '@nestjs/common';
import { AppModule } from 'src/core/app/app.module';
import { MongodbModule } from '../../mongodb/mongodb.module';
import { PostModule } from '../../../core/post/post.module';

@Module({
  imports: [AppModule, MongodbModule, PostModule],
})
export class ServerRootModule {}
