import { Button } from "../ui/button";

export const SuccessHero = () => {
  return (
    <div
      className="min-h-[600px] lg:h-[600px] max-w-7xl mx-auto w-full py-6 pt-22 flex flex-col items-center bg-bottom bg-contain bg-no-repeat"
      style={{ backgroundImage: "url('/success/success-hero.png')" }}
    >
      <h1 className="text-8xl font-medium text-primary text-center">
        Success Stories
      </h1>

      <div className="w-full text-center pb-12 lg:py-0 ">
        <p className="text-center text-black font-bold text-lg max-w-4xl mx-auto">
          Real players. Real journeys. Real results.
        </p>
        <p className="text-center text-black font-light text-lg  mx-auto">
          Discover how OneShot Football Trials has helped hundreds of athletes
          take their next step toward the professional game.
        </p>
        <div className="flex items-center py-4 font-bold justify-center gap-x-4">
          <Button className="rounded-full px-8 text-white font-normal hover:cursor-pointer">
            Register for Your Trial
          </Button>
        </div>
      </div>
    </div>
  );
};
