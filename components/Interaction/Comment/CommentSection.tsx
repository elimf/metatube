import React, { useState } from "react";
import Comment from "@/components/Interaction/Comment/Comment";
import Image from "next/image";
import { CommentTypes } from "@/types/comment/comment";
import { CommentsSectionProps } from "@/types/props/Interaction/Comment/CommentsSectionProps";

const CommentsSection: React.FC<CommentsSectionProps> = ({ videoId }) => {
  const initialVisibleReplies = 3;
  const [newComment, setNewComment] = useState<string>("");
  const [visibleReplies, setVisibleReplies] = useState(initialVisibleReplies);
  const [comments, setComments] = useState<CommentTypes[]>([
    {
      id: "1",
      user: {
        id: "user1",
        name: "Alice",
        avatar: "https://via.placeholder.com/400", 
      },
      commentText: "This video is very informative. I enjoyed it!",
      timestamp: 1642396800000,
      replies: [],
    },
  ]);

  const handleReply = (commentId: string, replyText: string) => {
    const findAndAdd = (comments: CommentTypes[]): CommentTypes[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: `${
                  comment.replies
                    ? comment.replies.length * Date.now()
                    : Date.now()
                }`,
                user: {
                  id: "CurrentLoggedInUser",
                  name: "Current User",
                  avatar: "https://via.placeholder.com/400",
                },
                commentText: replyText,
                timestamp: Date.now(),
              },
            ],
          };
        } else if (comment.replies && comment.replies.length > 0) {
          // Si le commentaire a des réponses, ajoutez la nouvelle réponse à ses réponses existantes
          comment.replies.map((reply) => {
            if (reply.id === commentId) {
              comment.replies!.push({
                id: `${
                  comment.replies
                    ? comment.replies.length * Date.now()
                    : Date.now()
                }`,
                user: {
                  id: "CurrentLoggedInUser",
                  name: "Current User",
                  avatar: "https://via.placeholder.com/400",
                },
                commentText: replyText,
                timestamp: Date.now(),
              });
            }
          });
          return {
            ...comment,
          };
        }
        return comment;
      });
    };

    // Mettre à jour les commentaires
    setComments(findAndAdd(comments));
  };

  const handleCommentSubmit = () => {
    // Add logic to handle new comment submission
    const newCommentObject: CommentTypes = {
      id: `${comments.length * Date.now()}`,
      user: {
        id: "CurrentLoggedInUser", // Replace with actual user data
        name: "Current User", // Replace with actual user data
        avatar: "https://via.placeholder.com/400", // Replace with actual user avatar URL
      },
      replies: [],
      commentText: newComment,
      timestamp: Date.now(),
    };

    setComments([...comments, newCommentObject]);
    setNewComment(""); // Clear the input after submitting
  };
  const showMoreComments = () => {
    setVisibleReplies(visibleReplies + 3);
  };

  const showLessComments = () => {
    setVisibleReplies(initialVisibleReplies);
  };
  return (
    <div>
      {/* Input for new comment */}
      <div className="flex items-center mb-4">
        {/* Replace with actual user profile picture logic */}
        <Image
          src="https://via.placeholder.com/400"
          alt="Profile"
          className="w-12 h-12 rounded-full mr-2"
          width={40}
          height={40}
        />
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow p-2 rounded-l-md text-white bg-transparent focus:outline-none border-b-2 border-gray-300"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Comment
        </button>
      </div>

      {/* Existing comments */}
      {comments.slice(0, visibleReplies).map((item) => (
        <Comment key={item.id} comment={item} onReply={handleReply} />
      ))}

      {comments.length > visibleReplies && (
        <button onClick={showMoreComments} className="text-blue-500">
          Show more comments
        </button>
      )}
      {visibleReplies > initialVisibleReplies && (
        <button onClick={showLessComments} className="text-blue-500">
          Show less comments
        </button>
      )}
    </div>
  );
};

export default CommentsSection;
