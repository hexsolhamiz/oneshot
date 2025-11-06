import { howLinks } from "@/data/how";
import Image from "next/image";

const HowItWorks = () => {
  return (
    <div className="w-full max-h-[400px] max-w-7xl mx-auto py-24 flex justify-center lg:justify-start items-center">
      <div className="w-full">
        <h1 className="text-4xl text-primary ">
          Register and pay in under 3 minutes
        </h1>
        <p className="text-black font-normal text-start ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          faucibus lobortis nisi vitae venenatis. Donec convallis velit a
          dignissim molestie. Nam gravida hendrerit dolor nec faucibus. Vivamus
          varius ornare massa ut pulvinar.
        </p>
        <div className="w-full flex lg:flex-row flex-col py-8 justify-between">
            {
            howLinks.map((link)=> {
                return (
                    <div key={link.id} className="flex items-center shadow-md px-14 rounded-xl py-6">
                        <Image src={link.icon} alt={link.text} className="w-6 h-6 mr-2" width={100} height={100} />
                        <span className="text-black font-normal">{link.text}</span>
                    </div>
                );
            })
            }
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
