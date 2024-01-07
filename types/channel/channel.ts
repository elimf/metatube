import { VideoDetail } from "../video/videoDetail";

export interface Channel {
  channelName: string;
  description: string;
  subscribers: string;
  videos: VideoDetail[];
  isVerified: boolean;
  playlists: [];
  icon: string;
}
