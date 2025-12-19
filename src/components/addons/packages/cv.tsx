import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Cv = () => {
  return (
    <div className="min-h-[450px] lg:h-[450px] max-w-6xl mx-auto w-full py-16 flex lg:flex-row flex-col justify-center items-center">
      <div className="lg:w-[60%] flex gap-4 flex-col justify-center px-4 w-full">
        <h1 className="text-4xl text-primary">Football CV Creation</h1>
        <p className="text-sm">
          To give yourself the competitive edge, stand out with a{" "}
          <span className="text-primary font-bold">
            professionally designed CV
          </span>{" "}
          that acts as your comprehensive athletic profile. This essential
          document is meticulously created to effectively showcase your key
          stats, background, and achievements in a clear, impactful format,
          ensuring scouts and clubs immediately recognize your potential.
        </p>
        <p className="text-sm">Delivered in PDF & editable format.</p>
        <p className="text-sm">
          Price: <span className="text-primary font-bold">£39.99</span>
        </p>
        <div>
          <Button className="rounded-4xl px-8 font-normal hover:cursor-pointer">
            Add to Registration
          </Button>
        </div>
      </div>
      <div className="relative w-full h-full lg:w-[40%]">
        <Image src="/addons/cv.png" fill alt="footballer" />
      </div>
    </div>
  );
};
