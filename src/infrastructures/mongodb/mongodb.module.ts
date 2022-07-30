import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_ADDR, MGO_DEFAULT_DB } from '../../constants';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${MONGO_ADDR}/${MGO_DEFAULT_DB}`),
  ],
})
export class MongodbModule {}
