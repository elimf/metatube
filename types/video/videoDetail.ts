import { CommentTypes } from "../comment/comment";
export interface VideoDetail {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  url: string;
  timestamp: string;
  likedBy: string[];
  channel: {
    _id: string;
    channelName: string;
    icon: string;
    subscribers: number;
  };
  suggestions: SuggestionVideo[];
  liked: boolean;
  subscribed: boolean;
  comments: CommentTypes[];
}
export interface SuggestionVideo {
  _id: string;
  title: string;
  thumbnail: string;
  views: number;
  timestamp: string;
  url: string;
  channel: {
    _id: string;
    channelName: string;
    icon: string;
    subscribers: number;
  };
}
