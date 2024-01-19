import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Comment from "@/components/Interaction/Comment/Comment";
import Image from "next/image";
import { CommentTypes, CreateCommentDto, CommentsSectionProps } from "@/types";
import { apiRefresh } from "@/app/api/auth/refresh";
import { apiCommentCreate } from "@/app/api/interaction/comment";
import { JwtTokenManager } from "@/utils/jwtManager";

const CommentsSection: React.FC<CommentsSectionProps> = ({ videoDetails }) => {
  const initialVisibleReplies = 3;
  const [visibleReplies, setVisibleReplies] = useState(initialVisibleReplies);
  const [allComments, setAllComments] = useState<CommentTypes[]>(
    videoDetails.comments
  );
  const tokenManager = new JwtTokenManager();
  const { register, handleSubmit, reset } = useForm<CreateCommentDto>({});

  const handleReply = (newResponse: CommentTypes, commentId: string) => {
    const findAndAdd = (comments: CommentTypes[]): CommentTypes[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                ...newResponse,
              },
            ],
          };
        } else if (comment.replies && comment.replies.length > 0) {
          // Si le commentaire a des réponses, ajoutez la nouvelle réponse à ses réponses existantes
          comment.replies.map((reply) => {
            if (reply.id === newResponse.id) {
              comment.replies!.push({
                ...newResponse,
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
    setAllComments(findAndAdd(videoDetails.comments));
  };

  const onSubmit: SubmitHandler<CreateCommentDto> = async (values) => {
    const newComment: CreateCommentDto = {
      text: values.text,
      videoId: videoDetails._id,
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
        reset();
        setAllComments([likeResponse.message, ...videoDetails.comments]);
      }
    } catch (error) {
      // Gestion des erreurs
      console.error("Erreur lors de la gestion du like :", error);
    }
  };

  const showMoreComments = () => {
    setVisibleReplies(visibleReplies + 3);
  };

  const showLessComments = () => {
    setVisibleReplies(initialVisibleReplies);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("text", { required: true })}
          className="flex-grow p-2 rounded-l-md text-white bg-transparent focus:outline-none border-b-2 border-gray-300"
        />
        <input
          type="hidden"
          value={videoDetails._id}
          {...register("videoId", { required: true })}
          className="flex-grow p-2 rounded-l-md text-white bg-transparent focus:outline-none border-b-2 border-gray-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Comment
        </button>
      </div>

      {/* Existing comments */}
      {allComments.slice(0, visibleReplies).map((item) => (
        <Comment
          key={item.id}
          comment={item}
          onReply={handleReply}
          videoId={videoDetails._id}
          allComments={allComments}
        />
      ))}

      {allComments.length > visibleReplies && (
        <button onClick={showMoreComments} className="text-blue-500">
          Show more comments
        </button>
      )}
      {visibleReplies > initialVisibleReplies && (
        <button onClick={showLessComments} className="text-blue-500">
          Show less comments
        </button>
      )}
    </form>
  );
};

export default CommentsSection;
