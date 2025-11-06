import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { stories } from "@/data/stories";
import Image from "next/image";

export const StoriesCarousel = () => {
  return (
    <div className="w-full overflow-hidden">
      <Carousel className="w-full overflow-hidden">
        <CarouselContent className="overflow-hidden">
          {stories.map((story, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="p-1">
                <Card className="w-full h-[300px] shadow-2xl border-r border-b border-b-primary border-r-primary">
                  <CardContent className="w-full flex gap-4 flex-col items-center justify-center p-6">
                    <Image
                      src="/icons/commas.png"
                      alt="commas"
                      width={80}
                      height={80}
                    />
                    <h1 className="text-primary text-2xl">{story.name}</h1>
                     <p className="max-w-xs text-center">{story.description}</p>
                     <h1 className="text-primary">{story.position} | {story.city}</h1>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
