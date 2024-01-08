export interface CommentTypes {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string; // URL to the user's avatar image
  };
  commentText: string;
  timestamp: number;
  replies?: CommentTypes[];
}
