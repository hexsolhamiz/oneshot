import { Button } from "../ui/button";

export const AboutHero = () => {
  return (
    <div className="min-h-[600px] max-w-7xl mx-auto w-full py-6 flex flex-col items-center bg-center">
      <h1 className="text-7xl text-primary text-center">About one shot Football trials</h1>

      <div className="w-full text-center py-4 lg:py-0 pb-22">
        <p className="font-normal text-center text-black text-xl">
          More Than a Trial — A Pathway to the Pro Game.
        </p>
        <p className="font-normal text-center text-black text-xl">
          OneShot Football Trials was built to redefine football scouting — giving every player a fair and transparent chance to be seen.
        </p>
        <div className="flex items-center py-4 font-bold justify-center gap-x-4">
          <Button className="rounded-full px-4 text-white font-normal hover:cursor-pointer">
            Meet the Team
          </Button>
          <Button
            variant="outline"
            className="border-primary px-8 hover:cursor-pointer rounded-full text-primary font-normal bg-transparent"
          >
            See Events
          </Button>
        </div>
      </div>


      <div className="w-full h-[500px] py-6 flex flex-col items-center bg-contain bg-no-repeat"  style={{backgroundImage: "url('/about/about-hero.png')"}}>

      </div>
    </div>
  );
};
