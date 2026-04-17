export interface Comment {
  id: string;
  postId: string;
  parentId: string | null;
  author: string;
  body: string;
  score: number;
  createdAt: Date;
  userVote: 1 | -1 | 0;
  replies: Comment[];
}
