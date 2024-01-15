export interface CommentTypes {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  commentText: string;
  timestamp: number;
  replies?: CommentTypes[];
}
