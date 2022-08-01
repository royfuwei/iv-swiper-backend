import _ = require('lodash');
import { Injectable } from '@nestjs/common';
import { MGO_POSTS_MODEL } from '../../constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from './schemas/post.schema';
import { PostDTO } from './dto/post.dto';
import { PostInterface } from './interfaces/post.interface';
import { BaseMongoRepo } from '../../infrastructures/mongodb/util';

@Injectable()
export class PostsRepo extends BaseMongoRepo<PostDocument, PostDTO> {
  constructor(
    @InjectModel(MGO_POSTS_MODEL)
    private readonly postModel: Model<PostDocument>,
  ) {
    super(postModel);
  }

  async findByFilter(): Promise<PostDTO[]> {
    const results: PostInterface[] = await this.postModel.find().exec();
    return results.map((item) => item.toObject({ getters: true }));
  }
}
