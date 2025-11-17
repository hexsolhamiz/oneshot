import React from "react";
import { Button } from "../ui/button";

export const CitiesHero = () => {
  return (
    <div
      className="min-h-[600px] lg:h-[600px] max-w-7xl mx-auto w-full py-6 pt-22 flex flex-col items-center bg-bottom bg-contain bg-no-repeat"
      style={{ backgroundImage: "url('/about/cities/cities-hero.png')" }}
    >
      <h1 className="text-7xl text-primary text-center">
        Find a Trial Near You
      </h1>

      <div className="w-full text-center pb-12 lg:py-0 ">
        <p className="text-center text-black font-light text-lg max-w-4xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
          nunc eu felis eleifend porttitor. Praesent eu rutrum sem. Pellentesque
          rutrum ullamcorper viverra. Maecenas blandit facilisis odio, sit amet
          tincidunt nulla vehicula non. Nulla condimentum turpis nisl, ut
          bibendum ipsum blandit eu.{" "}
        </p>
        <div className="flex items-center py-4 font-bold justify-center gap-x-4">
          <Button className="rounded-full px-8 text-white font-normal hover:cursor-pointer">
            View All Trials Below
          </Button>
        </div>
      </div>
    </div>
  );
};
