import { Injectable } from '@nestjs/common';
import { CommentsRepo } from './comments.repo';

@Injectable()
export class CommentsUseCase {
  constructor(private readonly commentsRepo: CommentsRepo) {}
}
