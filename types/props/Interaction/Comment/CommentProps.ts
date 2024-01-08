
import { CommentTypes } from "@/types/comment/comment";
export interface CommentProps {
  comment: CommentTypes;
  onReply?: (commentId: string, replyText: string) => void;
  initialVisibleReplies?: number;
}
