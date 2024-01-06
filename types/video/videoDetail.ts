import { Comment } from "../comment/comment";
export interface VideoDetail {
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  url: string;
  timestamp: string;
  //comments: Comment[];
}
