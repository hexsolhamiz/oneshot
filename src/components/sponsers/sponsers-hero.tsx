import { Button } from "../ui/button";

export const SponsersHero = () => {
  return (
    <div
      className="min-h-[600px] lg:h-[600px] max-w-7xl mx-auto w-full py-6 pt-22 flex flex-col items-center bg-bottom bg-contain bg-no-repeat"
      style={{ backgroundImage: "url('/sponsors/sponsors-hero.png')" }}
    >
      <h1 className="text-7xl text-primary text-center">Our Proud Sponsors</h1>

      <div className="w-full text-center pb-12 lg:py-0 ">
        <p className="text-center text-black font-light text-lg max-w-4xl mx-auto">
          We collaborate with industry-leading brands and organizations to help
          young talent take their shot and shine on the biggest stages.
        </p>
        <div className="flex items-center py-4 font-bold justify-center gap-x-4">
          <Button className="rounded-full px-8 text-white font-normal hover:cursor-pointer">
            View All Trials Below
          </Button>
        </div>
      </div>
    </div>
  );
};
