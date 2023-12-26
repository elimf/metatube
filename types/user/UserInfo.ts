
export interface UserInfo {
  username: string;
  avatar: string;
  channel: string;
  subscriptions: string[];  //TODO: change to ChannelInfo[]
  playlists: string[]; //TODO: change to PlaylistInfo[]
  history: string[]; //TODO: change to HistoryInfo[]
  likedVideos: string[]; //TODO: change to VideoLikeInfo[]
  timestamp: string;
}
