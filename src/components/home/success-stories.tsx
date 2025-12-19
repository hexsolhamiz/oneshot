import { StoriesCarousel } from "./stories-carousel";

export const SuccessStories = () => {
  return (
    <div className="min-h-[300px] w-full py-8 max-w-7xl mx-auto flex flex-col items-start justify-center">
      <div>
        <h1 className="text-4xl text-primary px-2 lg:px-0 text-start py-1">
          SUCCESS STORIES
        </h1>
        <p className="px-2 lg:px-0">
          From Trial to Triumph - Join 2,000+ players who&apos;ve taken their{" "}
          <span className="text-primary font-semibold">OneShot!</span>
        </p>
    
        <div className="lg:w-full lg:max-w-7xl max-w-sm w-full flex items-center justify-center">
            <StoriesCarousel />
        </div>

      </div>
    </div>
  );
};
