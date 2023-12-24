// sidebarData.tsx
import { MenuItem } from "@/types/props/SidebarProps";
import {
  HomeIcon,
  PlayIcon,
  StarIcon,
  CollectionIcon,
  DocumentTextIcon,
  MusicNoteIcon,
  GlobeAltIcon,
  UserIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
export const createMenuItem = (
  icon: JSX.Element,
  title: string,
  onClick: () => void
): MenuItem => ({
  icon,
  title,
  onClick,
});

export const mainMenuItems = [
  createMenuItem(<HomeIcon className="w-5 h-5" />, "Welcome", () =>
    console.log("Welcome Clicked")
  ),
  createMenuItem(<PlayIcon className="w-5 h-5" />, "Shorts", () =>
    console.log("Shorts Clicked")
  ),
  createMenuItem(<StarIcon className="w-5 h-5" />, "Subscriptions", () =>
    console.log("Subscriptions Clicked")
  ),
];

export const videosMenuItems = [
  createMenuItem(<PlayIcon className="w-5 h-5" />, "Your Channel", () =>
    console.log("Channel Clicked")
  ),
  createMenuItem(<CollectionIcon className="w-5 h-5" />, "Historical", () =>
    console.log("Historical Clicked")
  ),
  createMenuItem(<DocumentTextIcon className="w-5 h-5" />, "Your videos", () =>
    console.log("Your videos Clicked")
  ),
  createMenuItem(<StarIcon className="w-5 h-5" />, "To watch later", () =>
    console.log("To watch later Clicked")
  ),
  createMenuItem(<ThumbUpIcon className="w-5 h-5" />, "Liked Video", () =>
    console.log("Liked Video Clicked")
  ),
];

export const explorerMenuItems = [
  createMenuItem(<GlobeAltIcon className="w-5 h-5" />, "Trends", () =>
    console.log("Trends Clicked")
  ),
  createMenuItem(<MusicNoteIcon className="w-5 h-5" />, "Music", () =>
    console.log("Music Clicked")
  ),
];
