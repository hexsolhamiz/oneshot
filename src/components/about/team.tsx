import { teams } from "@/data/team";
import Image from "next/image";
import React from "react";

export const Team = () => {
  return (
    <div className="max-w-7xl mx-auto w-full min-h-[400px] flex flex-col justify-center">
      <h1 className="text-4xl text-primary text-center">Meet the Team</h1>
      <p className="font-normal text-center max-w-4xl mx-auto text-black text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
        nunc eu felis eleifend porttitor. Praesent eu rutrum sem. Pellentesque
        rutrum ullamcorper viverra. Maecenas blandit facilisis odio, sit amet
        tincidunt nulla vehicula non.
      </p>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 py-4 grid-cols-1 place-items-center items-center">
        {teams.map((team, index) => {
          return (
            <div key={index}>
              <Image
                src={team.imgSrc}
                alt={team.name}
                width={250}
                height={250}
                className="w-full h-full"
              />
              <h1 className="text-center pt-2 text-primary font-bold">{team.name}</h1>
              <p className="text-center text-sm">{team.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
