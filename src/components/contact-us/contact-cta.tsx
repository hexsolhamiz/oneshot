import Link from "next/link";
import { Button } from "../ui/button";

export const ContactCta = () => {
  return (
    <div className="min-h-[400px] max-w-7xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-primary text-6xl text-center">Ready to Take Your Shot?</h1>
      <p className="text-center px-1">
        Spots are limited and fill fast — secure your place at the next OneShot
        Trial.{" "}
      </p>
      <Link href="/cities">
      <Button className="my-3 bg-primary text-white font-normal rounded-full mr-1 px-6">
        Register Now
      </Button>
      </Link>
    </div>
  );
};
