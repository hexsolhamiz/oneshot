import React from "react";
import { Highlight } from "./packages/highlight";
import { Photos } from "./packages/photos";
import { Pro } from "./packages/pro";
import { Cv } from "./packages/cv";

export const ExplorePackages = () => {
  return (
    <div className="min-h-[400px] w-full max-w-7xl mx-auto justify-center items-center">
      <div className="w-ful flex flex-col justify-center items-center">
        <h1 className="text-primary text-4xl">Explore Packages</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
          nunc eu felis eleifend porttito Eraesent eu rutrum sem.
        </p>
        <Highlight />
        <Photos />
        <Pro />
        <Cv />
      </div>
    </div>
  );
};
