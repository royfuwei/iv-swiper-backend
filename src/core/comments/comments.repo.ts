import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MGO_COMMENTS_MODEL } from '../../constants';
import { CommentDocument } from './schemas/comments.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDTO, CountGroupByPostIdDTO } from './dto/comment.dto';
import { BaseMongoRepo } from '../../infrastructures/mongodb/util';

@Injectable()
export class CommentsRepo extends BaseMongoRepo<CommentDocument, CommentDTO> {
  constructor(
    @InjectModel(MGO_COMMENTS_MODEL)
    private readonly commentsModel: Model<CommentDocument>,
  ) {
    super(commentsModel);
  }

  /**
   * 用aggregate 取得最多留言的貼文
   * @param limit 限制筆數
   * @returns CountGroupByPostIdDTO[]
   */
  async aggregateCountByPostId(): Promise<CountGroupByPostIdDTO[]> {
    const groupQuery = {
      _id: {
        postId: `$postId`,
      },
      count: {
        $sum: 1,
      },
    };
    const results = await this.commentsModel.aggregate<CountGroupByPostIdDTO>([
      { $group: groupQuery },
      { $sort: { count: -1 } },
    ]);
    return results;
  }
}
