import Image from "next/image";
import React from "react";

export const WatchHighlights = () => {
  const videos = [
    {
      id: 1,
      videoUrl: "/videos/video1.png",
    },
    {
      id: 2,
      videoUrl: "/videos/video2.png",
    },
    {
      id: 3,
      videoUrl: "/videos/video3.png",
    },
    {
      id: 4,
      videoUrl: "/videos/video4.png",
    },
  ];
  return (
    <div className="min-h-[600px] py-16 max-w-7xl mx-auto w-full flex flex-col items-center">
      <h1 className="text-primary text-5xl">Watch the Highlights</h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar
        blandit elit, vel sagittis eros posuere nec. In hac habitasse platea
        dictumst. Pellentesque volutpat nulla et diam dignissim tempor.
      </p>

      <div className="grid grid-cols-1 pt-12 pb-4 gap-4 md:grid-cols-2 lg:grid-cols-4 mx-4 px-2 ">
        {videos.map((video) => {
          return <Image key={video.id} src={video.videoUrl} alt={video.videoUrl} width={200} height={200} className="h-80 w-auto" />;
        })}
      </div>

      <div className="grid grid-cols-1 pt-2 pb-4 gap-4 md:grid-cols-2 lg:grid-cols-4 mx-4 px-2 ">
        {videos.map((video) => {
          return <Image key={video.id} src={video.videoUrl} alt={video.videoUrl} width={200} height={200} className="h-80 w-auto" />;
        })}
      </div>
    </div>
  );
};
