import { NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import _ = require('lodash');

export class BaseMongoRepo<TModel, TData> {
  private model: Model<TModel>;
  constructor(model: Model<TModel>) {
    this.model = model;
  }

  async findById(id: string): Promise<TData> {
    const result = await this.model.findById(id).exec();
    if (_.isNull(result)) {
      throw new NotFoundException(id);
    }
    return result.toObject<TData>({ getters: true });
  }

  async add(data: TData): Promise<TData> {
    const create = new this.model(data);
    const post = await create.save();
    const result: TData = post.toObject({ getters: true });
    return result;
  }

  async updateById(id: string, data: TData): Promise<TData> {
    const result = await this.model
      .findByIdAndUpdate(id, {
        $set: data,
      })
      .exec();
    if (_.isNull(result)) {
      throw new NotFoundException(id);
    }
    return this.findById(id);
  }

  async findByFilter(
    filter: FilterQuery<TData> = {},
    projection?: any,
    options?: QueryOptions,
  ): Promise<TData[]> {
    const results = await this.model.find(filter, projection, options).exec();
    return results.map((item) => item.toObject({ getters: true }));
  }
}
