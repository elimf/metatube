import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ThumbUpIcon } from "@heroicons/react/solid";
import { LikeButtonProps } from "@/types/props/Interaction/Like/LikeButtonProps";
import { JwtTokenManager } from "@/utils/jwtManager";
import { apiLikeManager } from "@/api/interaction/like";
import { CreateLikeDto } from "@/types";

const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked: initialIsLiked,
  likeCount: initialLikeCount,
  videoId,
  type,
}) => {
  const { handleSubmit, setValue, register, watch } = useForm<CreateLikeDto>();
  const [isLiked, setLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const tokenManager = new JwtTokenManager();

  // Regardez les changements dans le formulaire pour déclencher le rendu lorsque les données changent
  watch();
  const onSubmit = async (data: CreateLikeDto) => {
    try {
      const formData =data;
      await tokenManager.handleApiCallWithToken(apiLikeManager, formData);
      // Si le traitement réussit, mettez à jour l'état ici
      setLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      // Si le traitement échoue, vous pouvez gérer les erreurs ici
      console.error("Erreur lors de la gestion du like :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Assurez-vous de lier les champs à votre formulaire avec register */}
      <input type="hidden" value={videoId} {...register("entityId")} />
      <input type="hidden" value={type} {...register("entityType")} />

      <button
        type="submit" // Évitez que le formulaire ne soit soumis automatiquement
        className="text-white bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 "
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
