import { Injectable } from '@nestjs/common';
import { MGO_POST_MODEL } from '../../constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsRepo {
  constructor(
    @InjectModel(MGO_POST_MODEL)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async findAllByFilter() {
    const results: Post[] = await this.postModel.find().exec();
    return results;
  }
}
