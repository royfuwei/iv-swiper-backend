import { Injectable, NotFoundException } from '@nestjs/common';
import { MGO_POSTS_MODEL } from '../../constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from './schemas/post.schema';
import { PostDTO } from './dto/post.dto';
import { PostInterface } from './interfaces/post.interface';
import _ = require('lodash');

@Injectable()
export class PostsRepo {
  constructor(
    @InjectModel(MGO_POSTS_MODEL)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async findByFilter(): Promise<PostDTO[]> {
    const results: PostInterface[] = await this.postModel.find().exec();
    return results.map((item) => item.toObject({ getters: true }));
  }

  async addPost(data: PostDTO): Promise<PostDTO> {
    const postModel = new this.postModel(data);
    const post: PostInterface = await postModel.save();
    const result: PostDTO = post.toObject({ getters: true });
    return result;
  }

  async updateById(id: string, data: PostDTO): Promise<PostDTO> {
    const result = await this.postModel
      .findByIdAndUpdate(id, {
        $set: data,
      })
      .exec();
    if (_.isNull(result)) {
      throw new NotFoundException(id);
    }
    return this.findById(id);
  }

  async findById(id: string): Promise<PostDTO> {
    const result = await this.postModel.findById(id).exec();
    return result.toObject<PostDTO>({ getters: true });
  }
}
