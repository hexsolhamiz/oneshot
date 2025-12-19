"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { packages } from "@/data/package";
import PackageCard from "./package-card";

const PackagesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }); // loop false
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Defer initial selection and scroll snaps update to avoid synchronous setState inside the effect
    const timeout = window.setTimeout(() => {
      onSelect();
      setScrollSnaps(emblaApi.scrollSnapList());
    }, 0);

    emblaApi.on("select", onSelect);
    return () => {
      clearTimeout(timeout);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Re-init on resize
  useEffect(() => {
    if (!emblaApi) return;
    const resizeHandler = () => emblaApi.reInit();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [emblaApi]);

  return (
    <div className="mx-auto max-w-7xl min-h-[600px] flex flex-col justify-centermx-auto w-full">
      <div className="py-6">
      <h1 className="text-3xl text-center text-primary">Enhance Your Trial Experience</h1>
      <p className="text-black text-center ">
        Turn your performance into a professional showcase — choose from our
        exclusive add-ons below.
      </p>
</div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-2"
            >
              <PackageCard packages={pkg} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 rounded-full mx-1 transition-all duration-300",
              index === selectedIndex ? "bg-primary w-6" : "bg-gray-400 w-6"
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagesCarousel;
