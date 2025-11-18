import { Button } from "@/components/ui/button";
import Image from "next/image";
export const Photos = () => {
  return (
    <div className="min-h-[450px] lg:h-[450px] max-w-6xl mx-auto w-full py-16 flex lg:flex-row flex-col justify-center items-center">
      <div className="lg:w-[60%] flex gap-4 flex-col justify-center px-4 w-full">
        <h1 className="text-4xl text-primary">Pro Photos Package</h1>
        <p className="text-sm">
          Ensure you have the visual evidence to back up your talent! You will{" "}
          <span className="text-primary font-bold">
            receive high-quality action and profile shots
          </span>{" "}
          by our experts, ensuring it showcases your best moments, captured by
          professional photographers during your trial session. These stunning
          images are perfect for your football CV to impress scouts, and they
          also provide engaging content for your social media channels to build
          your personal brand.
        </p>
        <p className="text-sm">Includes 10+ edited digital images.</p>
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
        <Image src="/addons/photos.png" fill alt="footballer" />
      </div>
    </div>
  );
};
