import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ = require('lodash');
import { MGO_POSTS_MODEL } from '../../../constants';

export type PostDocument = Post & Document;

@Schema({
  timestamps: { createdAt: 'creationTime', updatedAt: 'modiTime' },
  toObject: {
    transform: (doc: any, ret: any) => _.omit(ret, ['_id', '__v']),
  },
})
export class Post {
  @Prop({
    type: String,
  })
  uid: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  archived: boolean;

  @Prop({
    type: Date,
    default: Date.now,
    pre: 'save',
  })
  modiTime: Date;

  @Prop({
    type: Date,
    default: Date.now,
    pre: 'save',
  })
  creationTime: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
