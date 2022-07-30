// import { Schema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { MGO_POST_MODEL } from '../../../constants';

// export interface PostDocument extends Document {
//   uid: string;
//   content: string;
//   archived: boolean;
//   creationTime: Date;
//   modiTime: Date;
// }

export type PostDocument = Post & Document;

@Schema({
  timestamps: { createdAt: 'creationTime', updatedAt: 'modiTime' },
  collection: MGO_POST_MODEL,
  toJSON: {
    transform: (doc: any, ret: any) => _.omit(ret, ['_id']),
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

/* export const PostSchema = new Schema(
  {
    uid: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    modiTime: {
      type: Date,
      default: Date.now,
      pre: 'save',
    },
    creationTime: {
      type: Date,
      default: Date.now,
      pre: 'save',
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'creationTime', updatedAt: 'modiTime' },
  },
);

PostSchema.set('toJSON', {
  transform: (doc: any, ret: any) => _.omit(ret, ['_id']),
}); */
