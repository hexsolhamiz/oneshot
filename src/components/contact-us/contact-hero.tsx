import Image from "next/image";
import { Button } from "../ui/button";

export const ContactHero = () => {
  return (
    <div className="min-h-[600px] lg:h-[600px] w-full py-6 pt-22 flex flex-col items-center bg-bottom bg-contain bg-no-repeat">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-7xl text-primary text-center">
          Get in Touch with OneShot
        </h1>

        <div className="w-full text-center pb-12 lg:py-0 ">
          <p className="text-center text-black font-light text-lg max-w-4xl mx-auto">
            Have questions about registration, partnerships, or upcoming trials?
            Our team is here to help — let&apos;s make your journey simple.
          </p>
          <div className="flex items-center py-4 font-bold justify-center gap-x-4">
            <Button className="rounded-full px-8 text-white font-normal hover:cursor-pointer">
              View All Trials Below
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <Image
          src="/contact/stadium.png"
          width={900}
          height={900}
          alt="stadium"
          className="w-full h-[180px]"
        />
      </div>
    </div>
  );
};
