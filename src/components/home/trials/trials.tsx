import { trials } from "@/data/trials";
import React from "react";
import TrialCard from "./trials-card";

const Trials = () => {
  return (
    <div className="min-h-[600px] max-w-7xl w-full mx-auto flex flex-col justify-center">
      <h1 className="text-primary text-4xl text-center">Find a Trial Near You</h1>
      <p className="text-black font-bold text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        faucibus lobortis nisi vitae venenatis. Donec convallis velit a
        dignissim molestie. Nam gravida hendrerit dolor nec faucibus. Vivamus
        varius ornare massa ut pulvinar.
      </p>

      <div className="flex gap-4 py-8 w-full max-w-6xl mx-auto justify-around items-center">
         {trials.map((trial) => (
          <TrialCard key={trial.id} stadium={trial} />
         ))}
      </div>
    </div>
  );
};

export default Trials;
