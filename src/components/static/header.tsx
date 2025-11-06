"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { navigationLinks } from "@/data/navigation";

export default function Header() {
 
  return (
    <header
      className={`w-full shadow-xl flex justify-center items-center mx-auto`}
    >
      <div className="container my-2 mx-2 lg:mx-12 px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center space-x-1">
            <Image src={"/logos/logo.png"} alt="logo" width={60} height={50} />
          </Link>
          <div className="flex ">
            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center space-x-1 mx-6 `}>
              {navigationLinks.map((link,index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-black ${index === 7 ? "border-none": "border-primary border-r"} px-2 font-normal transition-colors hover:text-primary duration-200`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="button-box hidden lg:flex items-center space-x-3">
              <>
                <Link href="/auth">
                  <Button className="bg-secondary border border-primary text-primary hover:cursor-pointer rounded-full font-normal hover:bg-secondary hover:px-4">
                    Register
                  </Button>
                </Link>
                <Link href="/house-valuation">
                  <Button
                    variant="outline"
                    className="bg-primary text-white hover:cursor-pointer rounded-full hover:bg-secondary font-normal hover:border-primary px-6 py-2"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
