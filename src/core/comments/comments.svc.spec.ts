import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.svc';
import { CommentDTO, NestedCommentDTO } from './dto/comment.dto';

describe('CommentsService', () => {
  let commentsService: CommentsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CommentsService],
    }).compile();

    commentsService = app.get<CommentsService>(CommentsService);
  });

  describe('getNestedComments: ', () => {
    it('should return empty results', () => {
      const testData: CommentDTO[] = [];
      const expectResults: NestedCommentDTO[] = [];
      const results = commentsService.getNestedComments(testData);
      expect(results).toEqual(expectResults);
    });
    it('should return test case 1', () => {
      const testData: CommentDTO[] = [
        {
          id: 'root',
          postId: '62e66d221d69cd0708605f32',
          parentId: null,
          content: '填寫留言內容',
        },
        {
          id: 'root_A',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root',
          content: '留言內容01',
        },
        {
          id: 'root_B',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root',
          content: '留言內容02',
        },
      ];
      const expectResults: NestedCommentDTO[] = [
        {
          id: 'root',
          postId: '62e66d221d69cd0708605f32',
          parentId: null,
          content: '填寫留言內容',
          children: [
            {
              id: 'root_A',
              postId: '62e66d221d69cd0708605f32',
              parentId: 'root',
              content: '留言內容01',
              children: [],
            },
            {
              id: 'root_B',
              postId: '62e66d221d69cd0708605f32',
              parentId: 'root',
              content: '留言內容02',
              children: [],
            },
          ],
        },
      ];
      const results = commentsService.getNestedComments(testData);
      expect(results).toEqual(expectResults);
    });
    it('should return test case 2', () => {
      const testData: CommentDTO[] = [
        {
          id: 'root',
          postId: '62e66d221d69cd0708605f32',
          parentId: null,
          content: '填寫留言內容',
        },
        {
          id: 'root_A',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root',
          content: '留言內容01',
        },
        {
          id: 'root_B',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root',
          content: '留言內容02',
        },
        {
          id: 'root2',
          postId: '62e66d221d69cd0708605f32',
          parentId: null,
          content: '填寫留言內容',
        },
        {
          id: 'root2_A',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root2',
          content: '留言內容01',
        },
        {
          id: 'root2_B',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root2',
          content: '留言內容02',
        },
      ];
      const expectResults: NestedCommentDTO[] = [
        {
          id: 'root',
          postId: '62e66d221d69cd0708605f32',
          parentId: null,
          content: '填寫留言內容',
          children: [
            {
              id: 'root_A',
              postId: '62e66d221d69cd0708605f32',
              parentId: 'root',
              content: '留言內容01',
              children: [],
            },
            {
              id: 'root_B',
              postId: '62e66d221d69cd0708605f32',
              parentId: 'root',
              content: '留言內容02',
              children: [],
            },
          ],
        },
        {
          id: 'root2',
          postId: '62e66d221d69cd0708605f32',
          parentId: null,
          content: '填寫留言內容',
          children: [
            {
              id: 'root2_A',
              postId: '62e66d221d69cd0708605f32',
              parentId: 'root2',
              content: '留言內容01',
              children: [],
            },
            {
              id: 'root2_B',
              postId: '62e66d221d69cd0708605f32',
              parentId: 'root2',
              content: '留言內容02',
              children: [],
            },
          ],
        },
      ];
      const results = commentsService.getNestedComments(testData);
      expect(results).toEqual(expectResults);
    });
    it('should return test case 3, not found root', () => {
      const testData: CommentDTO[] = [
        {
          id: 'root_A',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root',
          content: '留言內容01',
        },
        {
          id: 'root_B',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root_A',
          content: '留言內容02',
        },
        {
          id: 'root2',
          postId: '62e66d221d69cd0708605f32',
          parentId: null,
          content: '填寫留言內容',
        },
        {
          id: 'root2_A',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root2',
          content: '留言內容01',
        },
        {
          id: 'root2_B',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root2',
          content: '留言內容02',
        },
      ];
      const expectResults: NestedCommentDTO[] = [
        {
          id: 'root_A',
          postId: '62e66d221d69cd0708605f32',
          parentId: 'root',
          content: '留言內容01',
          children: [
            {
              id: 'root_B',
              postId: '62e66d221d69cd0708605f32',
              parentId: 'root_A',
              content: '留言內容02',
              children: [],
            },
          ],
        },
        {
          id: 'root2',
          postId: '62e66d221d69cd0708605f32',
          parentId: null,
          content: '填寫留言內容',
          children: [
            {
              id: 'root2_A',
              postId: '62e66d221d69cd0708605f32',
              parentId: 'root2',
              content: '留言內容01',
              children: [],
            },
            {
              id: 'root2_B',
              postId: '62e66d221d69cd0708605f32',
              parentId: 'root2',
              content: '留言內容02',
              children: [],
            },
          ],
        },
      ];
      const results = commentsService.getNestedComments(testData);
      expect(results).toEqual(expectResults);
    });
  });
});
