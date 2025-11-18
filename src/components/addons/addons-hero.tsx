import Image from "next/image";
import { Button } from "../ui/button";

export const AddonsHero = () => {
  return (
    <div className="h-[500px] w-full max-w-7xl mx-auto flex justify-center items-center">
      <div className="hidden lg:flex lg:w-[25%] items-center justify-center">
        <Image
          src="/addons/addons-hero1.png"
          width={200}
          height={200}
          alt="footballer"
        />
      </div>
      <div className="lg:w-[50%] w-full flex flex-col items-center justify-center">
        <h1 className="text-8xl text-primary text-center">Enhance Your Trial Experience</h1>
        <p className="font-normal text-lg text-center">
          Turn your trial into a professional showcase with exclusive OneShot
          add-ons designed to get you noticed.
        </p>
        <Button className="bg-primary my-4 text-white hover:cursor-pointer font-normal rounded-full mr-1 px-10">
          View Packages
        </Button>
      </div>
      <div className="hidden lg:flex lg:w-[25%] items-center justify-center">
        <Image
          src="/addons/addons-hero2.png"
          width={200}
          height={200}
          alt="footballer"
        />
      </div>
    </div>
  );
};
