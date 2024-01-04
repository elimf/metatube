export interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string; // URL to the user's avatar image
  };
  commentText: string;
  timestamp: number;
  replies?: Comment[];
}
