"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export const PartnerCarousel = () => {
  const [current, setCurrent] = useState(0);

  const partners = [
    {
      id: 1,
      name: "Tom Reed",
      review:
        "Partnering with OneShot allowed us to reach a passionate audience while supporting grassroots football.",
    },
    {
      id: 2,
      name: "Tom Reed",
      review:
        "Partnering with OneShot allowed us to reach a passionate audience while supporting grassroots football.",
    },
    {
      id: 3,
      name: "Tom Reed",
      review:
        "Partnering with OneShot allowed us to reach a passionate audience while supporting grassroots football.",
    },
    {
      id: 4,
      name: "Tom Reed",
      review:
        "Partnering with OneShot allowed us to reach a passionate audience while supporting grassroots football.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-12  py-10">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
        setApi={(api) => {
          if (!api) return;

          // Update indicator on slide change
          api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent className="flex px-4 gap-4">
          {partners.map((partner) => (
            <CarouselItem
              key={partner.id}
              className="text-white mx-4 max-w-7xl h-92 flex flex-col bg-center items-center justify-center rounded-4xl"
              style={{
                backgroundImage: "url('/sponsors/carousel-bg.png')",
                backgroundSize: "cover",
              }}
            >
              <div className="w-full flex flex-col items-center justify-center">
                <Image
                  src="/icons/white.png"
                  alt="commas"
                  width={300}
                  height={300}
                  className=" w-22 h-22 my-6"
                />
                <p className="text-lg text-center max-w-xl leading-relaxed mb-4">
                  {`"${partner.review}"`}
                </p>
                <h3 className="font-semibold text-xl">{partner.name}</h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {partners.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-sm transition-all duration-300 ${
              current === index ? "bg-primary w-8" : "bg-gray-500 w-4"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
