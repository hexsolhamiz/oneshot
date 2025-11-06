import Image from "next/image";
import { Button } from "@/components/ui/button";

interface pkg {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}
export default function PackageCard({ packages }: { packages: pkg }) {
  return (
    <div className="shadow-3xl bg-white h-[300px] rounded-3xl overflow-hidden max-w-md w-full">
     
      <div className="h-full flex flex-row justify-between">
        {/* Left Content Section */}
        <div className="w-[50%] rounded-4xl relative bg-red-400 h-full">
          <Image
            src={packages.image}
            alt="Highlight Video Package - Soccer Players in Action"
            fill
            className="object-cover rounded-3xl"
          />
        </div>

        {/* Right Image Section */}
        <div className="w-[50%] p-6 text-black space-y-1">
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-primary">
              {packages.name}
            </h2>
            <p className="text-xs text-black">{packages.description}</p>
          </div>

          {/* Price */}
          <div className="py-3">
            <div className="flex items-baseline gap-2">
              <p className="text-md">
                Price:{" "}
                <span className=" font-bold text-primary">
                  €{packages.price}
                </span>
              </p>
            </div>
          </div>

          {/* Button */}
          <Button className="hover:cursor-pointer rounded-full bg-primary text-white font-normal py-2 transition-colors">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
