import { LikedEntityType } from "@/utils/enumLike";

export interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  videoId: string;
  type: LikedEntityType;
}
