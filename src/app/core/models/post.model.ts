export interface Post {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  score: number;
  commentCount: number;
  createdAt: Date;
  content?: string;
  imageUrl?: string;
  userVote: 1 | -1 | 0;
}
