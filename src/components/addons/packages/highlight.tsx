import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Highlight = () => {
  return (
    <div className="min-h-[450px] lg:h-[450px] max-w-6xl mx-auto w-full py-16 flex lg:flex-row flex-col justify-center items-center">
      <div className="relative w-full h-full lg:w-[40%]">
        <Image src="/addons/highlight.png" fill alt="footballer" />
      </div>
      <div className="lg:w-[60%] flex gap-4 flex-col justify-center px-4 w-full">
        <h1 className="text-4xl text-primary">Highlight Video Package</h1>
        <p className="text-sm">
          Prepare to make a lasting impression! <span className="text-primary font-bold">Get your professional highlight
          video edited</span> by our experts, ensuring it showcases your best moments,
          skills, and dedication in the most compelling way. Once complete, your
          polished video will be ready to share with scouts and clubs, giving
          you the perfect tool to stand out and advance your career.
        </p>
        <p className="text-sm">Delivered within 5 days after your trial.</p>
        <p className="text-sm">
          Price: <span className="text-primary font-bold">£49.99</span>
        </p>
        <div>
          <Button className="rounded-4xl px-8 font-normal hover:cursor-pointer">Add to Registration</Button>
        </div>
      </div>
    </div>
  );
};
