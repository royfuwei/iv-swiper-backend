import { Injectable } from '@nestjs/common';
import { Model, Query } from 'mongoose';
import { MGO_COMMENTS_MODEL } from '../../constants';
import { CommentDocument } from './schemas/comments.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsRepo {
  constructor(
    @InjectModel(MGO_COMMENTS_MODEL)
    private readonly commentsModel: Model<CommentDocument>,
  ) {}
}
