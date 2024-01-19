import React, { useState } from "react";
import { dateFormat } from "@/utils/dateFormat";
import { CommentProps } from "@/types/props/Interaction/Comment/CommentProps";
import Image from "next/image";
import { CommentTypes, CreateCommentDto } from "@/types";
import { apiRefresh } from "@/app/api/auth/refresh";
import { JwtTokenManager } from "@/utils/jwtManager";
import { apiCommentCreate } from "@/app/api/interaction/comment";

const Comment: React.FC<CommentProps> = ({
  videoId,
  comment,
  onReply,
  initialVisibleReplies = 3,
  allComments,
}) => {
  const [replyText, setReplyText] = useState("");
  const [visibleReplies, setVisibleReplies] = useState(initialVisibleReplies);
  const tokenManager = new JwtTokenManager();
  const handleReply = async () => {
    if (onReply && replyText.trim() !== "") {
      const ancestor = ascendToOldestParent(allComments, comment.id);
      if (!ancestor) return null;
      const newComment: CreateCommentDto = {
        text: replyText,
        videoId: videoId,
        commentId: ancestor.id,
      };

      try {
        const token = tokenManager.getToken() as string;

        const isTokenValid = await tokenManager.isTokenValid(token);

        if (!isTokenValid) {
          await apiRefresh();
        }

        const likeResponse = await apiCommentCreate(token, newComment);

        if (
          likeResponse.statusCode === 401 &&
          likeResponse.message === "Invalid JWT token"
        ) {
          await apiRefresh();
        }

        if (
          likeResponse.statusCode === 201 &&
          typeof likeResponse.message !== "string"
        ) {
          onReply(likeResponse.message, ancestor.id);
          setReplyText("");
        }
      } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la gestion du like :", error);
      }
    }
  };

  function ascendToOldestParent(
    comments: CommentTypes[],
    targetId: string
  ): CommentTypes | null {
    for (const comment of comments) {
      if (comment.replies && comment.replies.length > 0) {
        // Recherche récursive dans les réponses
        const ancestor = ascendToOldestParent(comment.replies, targetId);
        if (ancestor) {
          // Si un ancêtre est trouvé dans les réponses, retourne le commentaire actuel
          return comment;
        }
      }

      if (comment.id === targetId) {
        // Si l'ID correspond et il n'y a pas de réponses, retourne le commentaire actuel
        return comment;
      }
    }

    return null; // Aucun ancêtre trouvé
  }
  const showMoreReplies = () => {
    setVisibleReplies(visibleReplies + 3);
  };

  const showLessReplies = () => {
    setVisibleReplies(initialVisibleReplies);
  };

  return (
    <div className="bg-transparent rounded-lg mb-2 ml-2 ">
      <Image
        src={
          comment.user.avatar
            ? comment.user.avatar
            : "https://api.dicebear.com/7.x/avataaars-neutral/png?eyes=xDizzy"
        }
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
              <Comment
                key={reply.id}
                comment={reply}
                onReply={onReply}
                videoId={videoId}
                allComments={allComments}
              />
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
