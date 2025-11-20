import React from "react";
import { Button } from "../ui/button";

export const SponsorsCta = () => {
  return (
    <div>
      <div className="min-h-[400px] max-w-7xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-primary text-4xl">
          Join the Movement. Partner with OneShot.{" "}
        </h1>
        <p>
          Let&apos;s work together to inspire the next generation of football talent.
        </p>
        <Button className="my-3 bg-primary text-white font-normal rounded-full mr-1 px-6">
          Become a Partner
        </Button>
      </div>
    </div>
  );
};
