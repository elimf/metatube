import React, { useState } from "react";
import { dateFormat } from "@/utils/dateFormat";
import { CommentProps } from "@/types/props/Interaction/Comment/CommentProps";
import Image from "next/image";

const Comment: React.FC<CommentProps> = ({
  comment,
  onReply,
  initialVisibleReplies = 3,
}) => {
  const [replyText, setReplyText] = useState("");
  const [visibleReplies, setVisibleReplies] = useState(initialVisibleReplies);
  const handleReply = () => {
    if (onReply && replyText.trim() !== "") {
      onReply(comment.id, replyText);
      setReplyText("");
    }
  };
  const showMoreReplies = () => {
    setVisibleReplies(visibleReplies + 3);
  };

  const showLessReplies = () => {
    setVisibleReplies(initialVisibleReplies);
  };

  return (
    <div className="bg-transparent rounded-lg mb-2 ml-2 ">
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
        {/* Reply Input */}
        <div className="mt-2 flex">
          <input
            type="text"
            placeholder="Reply to this comment..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-grow p-2 rounded-l-md text-white bg-transparent focus:outline-none border-b-2 border-gray-300"
          />
          {replyText && (
            <button
              onClick={handleReply}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Reply
            </button>
          )}
        </div>
        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 mt-2 pl-2 border-gray-300">
            {comment.replies.slice(0, visibleReplies).map((reply) => (
              <Comment key={reply.id} comment={reply} onReply={onReply} />
            ))}
            {comment.replies.length > visibleReplies && (
              <button onClick={showMoreReplies} className="text-blue-500">
                Show more
              </button>
            )}
            {visibleReplies > initialVisibleReplies && (
              <button onClick={showLessReplies} className="text-blue-500">
                Show less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
