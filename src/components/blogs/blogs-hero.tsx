import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export const BlogsHero = () => {
  return (
    <div className="h-[500px] w-full max-w-7xl mx-auto flex justify-center items-center">
      <div className="hidden lg:flex lg:w-[25%] items-center justify-center">
        <Image
          src="/blogs/blogs-hero1.png"
          width={200}
          height={200}
          alt="footballer"
        />
      </div>
      <div className="lg:w-[50%] w-full flex flex-col items-center justify-center">
        <h1 className="lg:text-8xl text-6xl text-primary text-center">
          Insights. Stories. Updates.
        </h1>
        <p className="font-normal p-1 text-lg text-center">
          Stay up to date with OneShot Football Trials — from player tips to
          event announcements and success journeys.
        </p>
        <Link href="#articles">
        <Button className="bg-primary my-4 text-white hover:cursor-pointer font-normal rounded-full mr-1 px-10">
          Read Latest Articles below
        </Button>
      </Link>
      </div>
      <div className="hidden lg:flex lg:w-[25%] items-center justify-center">
        <Image
          src="/blogs/blogs-hero2.png"
          width={200}
          height={200}
          alt="footballer"
        />
      </div>
    </div>
  );
};
