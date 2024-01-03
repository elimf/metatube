export interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  likedBy: string[]; 
  comments: any[]; 
  url: string;
  timestamp: string;
}
