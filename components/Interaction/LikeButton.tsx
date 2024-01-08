import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ThumbUpIcon } from "@heroicons/react/solid";
import { LikeButtonProps } from "@/types/props/Interaction/Like/LikeButtonProps";


const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked: initialIsLiked,
  likeCount: initialLikeCount,
}) => {
  const { register, handleSubmit } = useForm();
  const [isLiked, setLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLikeClick = () => {
    // Mettre à jour l'état local en fonction du clic sur le bouton "J'aime"
    setLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Vos autres champs de formulaire ici */}

      {/* Utilisation du bouton "J'aime" avec React Hook Form */}
      <button
        type="button"
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
