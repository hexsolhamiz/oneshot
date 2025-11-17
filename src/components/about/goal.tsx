import React from "react";
import Image from "next/image";
export const Goal = () => {
  return (
    <div className="min-h-[350px] my-16 max-w-7xl rounded-4xl mx-auto border-2 border-l-primary border-b-primary border-t-primary w-full flex lg:flex-row flex-col px-4 lg:px-0">
      <div className="relative lg:w-[35%] w-full">
        <Image src="/about/goal.png" alt="Mission" fill className="" />
      </div>
      <div className="lg:w-[65%] px-12 w-full flex flex-col justify-center">
        <h1 className="text-4xl text-primary text-start">OUR GOAL</h1>
        <p className="text-start font-light text-black text-md">
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
          nunc eu felis eleifend porttitor. Praesent eu rutrum sem. Pellentesque
          rutrum ullamcorper viverra. Maecenas blandit facilisis odio, sit amet
          tincidunt nulla vehicula non. Nulla condimentum turpis nisl, ut
          bibendum ipsum blandit eu. Maecenas rutrum mattis placerat neque
          libero, ut rutrum sem posuere sed. Aliquam faucibuh vel porta auctor.
          Maecenas dolor ipsum, varius vitae leo ut, ullamcorper finibus erat.
          Praesent rutrum lacus vel lectus efficitur consectetur. Etiam et odio
          at eros feugiat vehicula eu in erat. Etiam iaculis rhoncus neque.
          Curabitur quis justo metus. Nam sed posuere tellus.
        </p>
      </div>
    </div>
  );
};
