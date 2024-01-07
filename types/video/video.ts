export interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  url: string;
  timestamp: string;
  channel:{
    _id: string;
    channelName: string;
    icon: string;
  }
}
