"use client"
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { trials } from "@/data/trials";

import TrialCard from "./trials-card";

const Trials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);


  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Defer initial selection and scroll snaps update to avoid synchronous setState inside the effect
    const timeout = window.setTimeout(() => {
      onSelect();
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
    <div className="min-h-[600px] mt-24 lg:mt-0 max-w-7xl w-full mx-auto flex flex-col justify-center">
      <h1 className="text-primary text-4xl text-center">Find a Trial Near You</h1>
      <p className="text-black px-2 lg:px-0 font-normal text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        faucibus lobortis nisi vitae venenatis. Donec convallis velit a
        dignissim molestie. Nam gravida hendrerit dolor nec faucibus. Vivamus
        varius ornare massa ut pulvinar.
      </p>

      <div className="embla overflow-hidden mx-2 px-4 lg:px-0 py-8 w-full max-w-6xl lg:mx-auto">
        <div
          ref={emblaRef}
          className="embla__viewport overflow-hidden"
        >
          <div className="embla__container flex gap-4">
            {trials.map((trial) => (
              <div
                key={trial.id}
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_20%]"
              >
                <TrialCard stadium={trial} />
              </div>
            ))}
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Trials;
