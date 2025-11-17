import React from "react";
import { InputSearch } from "./input-search";

export const UpcomingTrials = () => {
  return (
    <div className=" w-full max-w-7xl mx-auto min-h-[500px] flex flex-col items-center justify-center">
      <h1 className="text-4xl text-primary text-center">UPCOMING TRIALS</h1>
      <p className="text-md font-light text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
        nunc eu felis eleifend porttito Eraesent eu rutrum sem.
      </p>
      <InputSearch />
    </div>
  );
};
