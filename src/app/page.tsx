import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
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
      </main>
    </div>
  );
}
