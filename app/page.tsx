"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import VideoPreview from "@/components/Video/VideoPreview";
import { getVideos } from "@/api/video/getVideo";
import { Video } from "@/types/video/video";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await getVideos();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <Header withSidebar={true}>
        <div className="flex-grow mt-24 px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {videos.map((video, index) =>
              loading ? (
                <div key={video._id}>
                  <p>Loading ...</p>
                </div>
              ) : (
                <VideoPreview item={video} key={index} useHover={true} />
              )
            )}
          </div>
        </div>
      </Header>
    </>
  );
}
