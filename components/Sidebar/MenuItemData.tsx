
import MenuItem from "./MenuItem";
import {
  HomeIcon,
  PlayIcon,
  StarIcon,
  CollectionIcon,
  MusicNoteIcon,
  GlobeAltIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";

export const mainMenuItems = [
  <MenuItem
    key="home"
    icon={<HomeIcon className="w-5 h-5" />}
    title="Home"
    path="/"
    isSidebarOpen={false}
  />,
  <MenuItem
    key="shorts"
    icon={<PlayIcon className="w-5 h-5" />}
    title="Shorts"
    path="/shorts"
    isSidebarOpen={false}
  />,
  <MenuItem
    key="subscriptions"
    icon={<StarIcon className="w-5 h-5" />}
    title="Subscriptions"
    path="/subscriptions"
    isSidebarOpen={false}
  />,
];

export let videosMenuItems = [
  <MenuItem
    key="History"
    icon={<CollectionIcon className="w-5 h-5" />}
    title="Historical"
    path="/history"
    isSidebarOpen={false}
  />,
  <MenuItem
    key="watchLater"
    icon={<StarIcon className="w-5 h-5" />}
    title="To watch later"
    path="/playlist?list=WL"
    isSidebarOpen={false}
  />,
  <MenuItem
    key="likedVideo"
    icon={<ThumbUpIcon className="w-5 h-5" />}
    title="Liked Video"
    path="/playlist?list=LL"
    isSidebarOpen={false}
  />,
];

export const explorerMenuItems = [
  <MenuItem
    key="trends"
    icon={<GlobeAltIcon className="w-5 h-5" />}
    title="Trends"
    path="#"
    isSidebarOpen={false}
  />,
  <MenuItem
    key="music"
    icon={<MusicNoteIcon className="w-5 h-5" />}
    title="Music"
    path="#"
    isSidebarOpen={false}
  />,
];
