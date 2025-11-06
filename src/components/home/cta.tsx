import React from "react";
import { Button } from "../ui/button";

const Cta = () => {
  return (
    <div className="w-full max-w-7xl mx-auto min-h-[300px] h-full flex flex-col justify-center gap-2 items-center">
      <h1 className="text-primary text-5xl">Ready to Take Your Shot?</h1>
      <p>
        Secure your place at the next OneShot Football Trial and show scouts
        what you&apos;ve got.
      </p>
      <Button
        className="w-fit text-xs px-6 rounded-full my-1 bg-primary font-normal text-white gap-2"
        size="sm"
      >
        Register Now
      </Button>
    </div>
  );
};

export default Cta;
