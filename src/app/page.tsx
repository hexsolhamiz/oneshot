import Cta from "@/components/home/cta";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import PackagesCarousel from "@/components/home/packages/packages-carousel";
import { Sponsers } from "@/components/home/sponsers";
import { SuccessStories } from "@/components/home/success-stories";
import Trials from "@/components/home/trials/trials";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header>

      </header>
      <main className="min-h-screen w-full">
        <Hero />
        <HowItWorks />
        <Trials />
        <Cta />
        <PackagesCarousel />
        <SuccessStories />
        <Sponsers />
      </main>
    </div>
  );
}
