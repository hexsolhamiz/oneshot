import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Pro = () => {
  return (
    <div className="min-h-[450px] lg:h-[450px] max-w-6xl mx-auto w-full py-16 flex lg:flex-row flex-col justify-center items-center">
      <div className="relative w-full h-full lg:w-[40%]">
        <Image src="/addons/pro.png" fill alt="footballer" />
      </div>
      <div className="lg:w-[60%] flex gap-4 flex-col justify-center px-4 w-full">
        <h1 className="text-4xl text-primary">Pro player Pack</h1>
        <p className="text-sm">
          Seize this incredible{" "}
          <span className="text-primary font-bold">Bundle Offer</span> and equip
          yourself with everything you need to impress scouts. This package
          conveniently includes a {" "}
          <span className="text-primary font-bold">
            professional highlight video
          </span>
          , high-quality pro photos to capture your best angles, and expert
          assistance with{" "}
          <span className="text-primary font-bold">player CV creation</span>,
          all combined and offered to you at a discounted rate for maximum
          value.
        </p>
        <p className="text-sm">Save £20 when you choose the bundle.</p>
        <p className="text-sm">
          Price: <span className="text-primary font-bold">£99.99</span>
        </p>
        <div>
          <Button className="rounded-4xl px-8 font-normal hover:cursor-pointer">
            Add to Registration
          </Button>
        </div>
      </div>
    </div>
  );
};
