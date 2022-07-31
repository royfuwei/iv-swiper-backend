import { PostDTO, PostNestCommentDTO, PostCommentDTO } from './post.dto';
import { PaginatedDTO } from '../../../infrastructures/util/paginated.dto';

export class ResPostDTO extends PostDTO {}
export class ResPostsNestCommentDTO extends PaginatedDTO<PostNestCommentDTO> {}
export class ResPostCommentDTO extends PostCommentDTO {}
