export interface Subreddit {
  name: string;
  title: string;
  description: string;
  memberCount: number;
  onlineCount: number;
  bannerColor: string;
  rules: string[];
  createdAt: Date;
}
