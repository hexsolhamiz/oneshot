import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="w-full py-6 flex flex-col items-center bg-center"  style={{backgroundImage: "url('/home/home-bg.png')"}}>
      <h1 className="text-8xl text-primary">Your Talent Deserves a Stage</h1>
      <div
        className="min-h-[500px] w-full flex flex-col justify-end bg-top"
        style={{
          backgroundImage: "url('/home/hero.png')",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full text-center pb-12">
          <h1 className="text-5xl text-black">
            Two Day Football Trials Across The UK
          </h1>
          <p className="font-normal text-black text-xl">Show your skills. Get seen by scouts</p>
          <div className="flex items-center py-4 font-bold justify-center gap-x-4">
           <Button className="rounded-full text-white font-normal hover:cursor-pointer">Register Now</Button>
           <Button variant="outline" className="border-primary hover:cursor-pointer rounded-full text-primary font-normal bg-transparent">See Events</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
