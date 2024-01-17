import { CommentTypes } from "@/types/comment/comment";
export interface CommentProps {
  videoId: string;
  comment: CommentTypes;
  onReply?: (newResponse: CommentTypes, commentId: string) => void;
  initialVisibleReplies?: number;
  allComments: CommentTypes[];
}
