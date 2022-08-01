import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MGO_COMMENTS_MODEL } from '../../constants';
import { CommentDocument } from './schemas/comments.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDTO } from './dto/comment.dto';
import { BaseMongoRepo } from '../../infrastructures/mongodb/util';

@Injectable()
export class CommentsRepo extends BaseMongoRepo<CommentDocument, CommentDTO> {
  constructor(
    @InjectModel(MGO_COMMENTS_MODEL)
    private readonly commentsModel: Model<CommentDocument>,
  ) {
    super(commentsModel);
  }
}
