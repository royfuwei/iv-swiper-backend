import { Document } from 'mongoose';

export interface PostInterface extends Document {
  uid: string;
  content: string;
  archived: boolean;
  creationTime: Date;
  modiTime: Date;
}
