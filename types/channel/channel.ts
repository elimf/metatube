import { VideoDetail } from "@/types";

export interface Channel {
  channelName: string;
  description: string;
  subscribers: string;
  videos: VideoDetail[];
  isVerified: boolean;
  playlists: [];
  icon: string;
}
