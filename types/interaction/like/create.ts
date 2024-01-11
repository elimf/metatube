import { LikedEntityType } from "@/utils/enumLike";

export interface CreateLikeDto {
  entityId: string;
  
  entityType: LikedEntityType;

}
