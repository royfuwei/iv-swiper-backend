import { Module } from '@nestjs/common';
import { AppModule } from 'src/core/app/app.module';
import { MongodbModule } from '../../mongodb/mongodb.module';

@Module({
  imports: [AppModule, MongodbModule],
})
export class ServerRootModule {}
