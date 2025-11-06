import { StoriesCarousel } from "./stories-carousel";

export const SuccessStories = () => {
  return (
    <div className="min-h-[300px] py-8 max-w-7xl w-full mx-auto flex flex-col items-start justify-center">
      <div>
        <h1 className="text-4xl text-primary text-start py-1">
          SUCCESS STORIES
        </h1>
        <p>
          From Trial to Triumph - Join 2,000+ players who&apos;ve taken their{" "}
          <span className="text-primary font-semibold">OneShot!</span>
        </p>
    
        <div>
            <StoriesCarousel />
        </div>

      </div>
    </div>
  );
};
