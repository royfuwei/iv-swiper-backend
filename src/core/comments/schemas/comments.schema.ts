import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ = require('lodash');
import { MGO_COMMENTS_MODEL } from '../../../constants';

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: { createdAt: 'creationTime', updatedAt: 'modiTime' },
  collection: MGO_COMMENTS_MODEL,
  toObject: {
    transform: (doc: any, ret: any) => _.omit(ret, ['_id', '__v']),
  },
})
export class Comment {
  @Prop({
    type: String,
  })
  uid: string;

  @Prop({
    type: String,
    default: null,
  })
  postId: string;

  @Prop({
    type: String,
    required: true,
  })
  parentId: string;

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

export const CommentSchema = SchemaFactory.createForClass(Comment);
