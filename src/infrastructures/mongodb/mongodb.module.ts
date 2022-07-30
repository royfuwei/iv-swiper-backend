import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_ADDR, MGO_DEFAULT_COLLECTION } from '../../constants';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${MONGO_ADDR}/${MGO_DEFAULT_COLLECTION}`),
  ],
})
export class MongodbModule {}
