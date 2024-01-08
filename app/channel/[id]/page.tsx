"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import TabBar from "@/components/Channel/Tabbar";
import ChannelInfo from "@/components/Channel/ChannelInfo";
import { apiChannelGetById } from "@/api/channel/getChannel";
import { Channel } from "@/types/channel";
import ChannelInfoLoader from "@/components/Loader/Channel/ChannelInfoLoader";
import TabbarLoader from "@/components/Loader/Channel/TabbarLoader";

const ChannelPage = () => {
  const pathname = usePathname();
  const [channelId, setChannelId] = useState<string | null>(null);
  const [channelData, setChannelData] = useState<Channel>({
    icon: "",
    channelName: "",
    playlists: [],
    isVerified: true,
    subscribers: "",
    videos: [],
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const channelIndex = pathname.indexOf("channel/");
    const newChannelId =
      channelIndex !== -1
        ? pathname.slice(channelIndex + 8).split("/")[0]
        : null;
    setChannelId(newChannelId);

    if (newChannelId) {
      apiChannelGetById(newChannelId).then((res) => {
        if (res) {
          setChannelData(res);
          setLoading(false);
        }
      });
    }
  }, [pathname]);

  return (
    <Header withSidebar={true}>
      <div className="flex-grow mt-24 px-8">
        {loading ? (
          <>
            <ChannelInfoLoader />
            <TabbarLoader />
          </>
        ) : (
          <>
            <ChannelInfo channelData={channelData} />
            <TabBar channelData={channelData} />
          </>
        )}
      </div>
    </Header>
  );
};

export default ChannelPage;
