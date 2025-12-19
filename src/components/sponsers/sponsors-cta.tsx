import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export const SponsorsCta = () => {
  return (
    <div>
      <div className="min-h-[400px] max-w-7xl mx-auto flex flex-col items-center justify-center">
        <h1 className="px-1 text-center text-primary text-4xl">
          Join the Movement. Partner with OneShot.{" "}
        </h1>
        <p className="text-center px-1">
          Let&apos;s work together to inspire the next generation of football talent.
        </p>
        <Link href="/contact-us">
        <Button className="my-3 hover:cursor-pointer bg-primary text-white font-normal rounded-full mr-1 px-6">
          Become a Partner
        </Button>
        </Link>
      </div>
    </div>
  );
};
