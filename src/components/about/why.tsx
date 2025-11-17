import React from "react";
import { Button } from "../ui/button";

export const Why = () => {
  return (
    <div
      className="w-full min-h-[400px] lg:h-[400px]"
      style={{ backgroundImage: "url('/about/why.png')" }}
    >
      <div className="max-w-7xl gap-3 h-full mx-auto w-full flex flex-col items-center justify-center">
        <h1 className="text-white font-bold text-5xl">
          Why Players Choose OneShot
        </h1>
        <p className="text-sm font-light max-w-4xl text-white text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
          nunc eu felis eleifend porttitor. Praesent eu rutrum sem. Pellentesque
          rutrum ullamcorper viverra. Maecenas blandit facilisis odio, sit amet
          tincidunt nulla vehicula non. Nulla condimentum turpis nisl, ut
          bibendum ipsum blandit eu. Maecenas rutrum mattis massa vel sagittis.
          Duis placerat neque libero, ut rutrum sem posuere sed. Aliquam
          faucibus nibh vel porta auctor.
        </p>
        <p className="text-sm text-white max-w-4xl font-light text-center">
          Nam non congue metus. Quisque ullamcorper est urna, sit amet lobortis
          leo faucibus non. In eget tellus eu est imperdiet dictum.
        </p>

        <Button className="bg-white rounded-full border border-primary text-primary px-12 font-light hover:bg-primary hover:text-white">
            Join the Next Trial
        </Button>
      </div>
    </div>
  );
};
