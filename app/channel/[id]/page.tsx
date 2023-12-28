"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import TabBar from "@/components/Channel/Tabbar";
import ChannelInfo from "@/components/Channel/ChannelInfo";
import { apiChannelGetById } from "@/api/channel/getChannel";
import { Channel } from "@/types/channel";

const ChannelPage = () => {
  const pathname = usePathname();
  const [channelId, setChannelId] = useState<string | null>(null);
  const [channelData, setChannelData] = useState<Channel>({
    banner: "https://via.placeholder.com/1200x200",
    icon: "https://via.placeholder.com/400",
    channelName: "ReallyCoolVlogs",
    isVerified: true,
    subscribers: "1,7M",
    videos: "1,000",
    description:
      "This is a really cool channel that you should subscribe to. It has really cool vlogs and stuff. Subscribe now!",
  });

  useEffect(() => {
    const channelIndex = pathname.indexOf("channel/");
    const newChannelId =
      channelIndex !== -1
        ? pathname.slice(channelIndex + 8).split("/")[0]
        : null;
    setChannelId(newChannelId);
    if (channelId) {
      apiChannelGetById(channelId).then((res) => {
        console.log(res);
        //setChannelData(res);
      });
    }
  }, [channelId, pathname]);

  return (
    <Header withSidebar={true}>
      <div className="flex-grow mt-24 px-8">
        <ChannelInfo channelData={channelData} />
        <section>
          <TabBar />
        </section>
      </div>
    </Header>
  );
};

export default ChannelPage;