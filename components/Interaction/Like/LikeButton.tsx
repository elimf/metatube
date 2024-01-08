import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ThumbUpIcon } from "@heroicons/react/solid";
import { LikeButtonProps } from "@/types/props/Interaction/Like/LikeButtonProps";
import { JwtTokenManager } from "@/utils/jwtManager";

const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked: initialIsLiked,
  likeCount: initialLikeCount,
  videoId,
}) => {
  const { handleSubmit } = useForm();
  const [isLiked, setLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const tokenManager = new JwtTokenManager();
  const token = tokenManager.getToken();
  const handleLikeClick = () => {
    if (token) {
      const valid = tokenManager.isTokenValid(token);
      if (valid) {
        //TODO : api like
        setLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      } else {
        tokenManager.refreshToken();
      }
    } 
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button
        type="submit"
        onClick={handleLikeClick}
        className="text-white bg-slate-600  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 "
      >
        <ThumbUpIcon
          className={`h-5 w-5 mr-2 ${isLiked ? "text-blue-500" : ""}`}
          aria-hidden="true"
        />
        {likeCount}
      </button>
    </form>
  );
};

export default LikeButton;
