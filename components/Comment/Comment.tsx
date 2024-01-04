import React, { useState } from "react";
import { dateFormat } from "@/utils/dateFormat";
import { Comment } from "@/types/comment/comment";
import Image from "next/image";

interface CommentProps {
  comment: Comment;
  onReply?: (commentId: string, replyText: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (onReply && replyText.trim() !== "") {
      onReply(comment.id, replyText);
      setReplyText("");
    }
  };

  return (
    <div className="bg-transparent rounded-lg p-4 mb-4 flex items-start">
      <Image
        src={comment.user.avatar}
        alt="User Avatar"
        className="w-10 h-10 rounded-full mr-4"
        width={40}
        height={40}
      />
      <div className="flex-grow">
        <div>
          <p className="text-white font-bold">
            {comment.user.name}{" "}
            <i className="text-sky-400 text-sm">
              {dateFormat(comment.timestamp)}
            </i>
          </p>
          <p className="text-white">{comment.commentText}</p>
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 mt-2 border-l-2 pl-2 border-gray-300">
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} onReply={onReply} />
            ))}
          </div>
        )}

        {/* Reply Input */}
        <div className="mt-2 flex">
          <input
            type="text"
            placeholder="Reply to this comment..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-grow border p-2 rounded-l-md"
          />
          <button
            onClick={handleReply}
            className="bg-blue-500 text-white p-2 rounded-r-md"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
