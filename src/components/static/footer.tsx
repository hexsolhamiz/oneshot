"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { footerLinks } from "@/data/links";


export const Footer = () => {
  return (
    <div
      className="min-h-[280px] overflow-hidden m-0 lg:h-[200px] flex flex-col justify-center items-center w-full bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('/home/home-bg.png')` }}
    >
      <div className="h-full max-w-[1300px] w-full py-4 mx-auto flex lg:flex-row flex-col justify-center items-center">
        <div className="relative lg:py-0 py-4 lg:w-[25%] w-full h-full flex flex-col items-start justify-center px-4  border-black border-r-1">
          <Image
            src="/logos/footer-logo.png"
            alt=""
            width={200}
            height={200}
            className="bg-contain"
          />
          <h2 className="mt-2 font-extrabold text-black">
            Your Talent. Your Stage.{" "}
          </h2>
          <p className="font-light text-sm py-2 text-black">
            Lorem ipsum dolor sit amet, consecte adipiscing elit fusce fringilla
            rhoncus nunc.
          </p>
          <Link href="/house-valuation">
            <Button className="px-8 font-light rounded-full bg-primary hover:cursor-pointer text-white hover:bg-secondary my-3">
              Check Now
            </Button>
          </Link>
        </div>
        <div className="lg:w-[15%] h-full w-full flex flex-col items-start justify-start px-4 pb-2 border-black border-r">
          <h2 className="font-bold text-black ">Quick Links</h2>
          <ul className="text-secondary">
            {
              footerLinks.map((link,index)=> {
                return (
                  <Link key={index} href={link.href}>
                  <li className="py-1 hover:cursor-pointer hover:text-primary text-black">{link.link}</li>
                  </Link>
                )
              })
            }
          </ul>
        </div>
        <div className="lg:w-[15%] h-full w-full flex flex-col items-start justify-start px-4  border-black border-r">
          <h2 className="font-bold text-black ">Help</h2>
          <ul className="text-secondary py-4">
            <Link href="/faq">
              <li className="py-1 hover:cursor-pointer text-black">
                FAQ&apos;s
              </li>
            </Link>
            <Link href="/privacy-policy">
              <li className="py-1 hover:cursor-pointer text-black">
                Privacy Policy
              </li>
            </Link>
            <Link href="/terms-and-conditions">
              <li className="py-1 hover:cursor-pointer text-black">
                Terms & Conditions
              </li>
            </Link>
            <Link href="/help-centre">
              <li className="py-1 hover:cursor-pointer text-black">
                Help Centre
              </li>
            </Link>
          </ul>
        </div>
        <div className="lg:w-[15%] h-full w-full flex flex-col items-start justify-start  border-black border-r">
          <h2 className="font-bold text-black px-4">Follow Us</h2>
          <div className="w-full flex justify-start gap-2 px-4 pt-4">
            <Image
              src="/icons/facebook.png"
              alt=""
              width={25}
              height={20}
              className="hover:cursor-pointer"
            />
            <Image
              src="/icons/insta.png"
              alt=""
              width={25}
              height={20}
              className="hover:cursor-pointer"
            />
            <Image
              src="/icons/x.png"
              alt=""
              width={25}
              height={20}
              className="hover:cursor-pointer"
            />
            <Image
              src="/icons/youtube.png"
              alt=""
              width={25}
              height={20}
              className="hover:cursor-pointer"
            />
          </div>
        </div>
        <div className="lg:w-[30%] w-full h-full flex flex-col items-start justify-start px-4 pb-4">
          <h2 className="font-extrabold text-black ">Stay Updated</h2>
          <p className="text-seconadary font-light py-4">
            Join our mailing list for exclusive offers and updates.
          </p>
          <div className="flex items-center border border-black rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <form className="flex w-full items-center">
              <Input
                type="email"
                placeholder="Enter Email Address"
                name="email"
                className="flex-1 border-0 bg-transparent px-6 py-4 text-gray-700 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                required
              />
              <Button
                type="submit"
                className="bg-primary hover:cursor-pointer text-white w-24 px-8 py-4 rounded-full m-1 font-medium transition-colors"
              >
                <span>Sign Up</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
