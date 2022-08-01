import { PostDTO, PostNestedCommentDTO, PostCommentDTO } from './post.dto';
import { PaginatedDTO } from '../../../infrastructures/util/paginated.dto';

export class ResPostDTO extends PostDTO {}
export class ResPostsNestedCommentDTO extends PaginatedDTO<PostNestedCommentDTO> {}
export class ResPostCommentDTO extends PostCommentDTO {}
