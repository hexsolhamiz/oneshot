import { Button } from "../ui/button";

export const SuccessCta = () => {
  return (
    <div className="min-h-[400px] max-w-7xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-primary text-4xl">
        Ready to Upgrade Your Experience?
      </h1>
      <p>
        Add professional media to your trial and show the world what you can do.
      </p>
      <Button className="my-3 bg-primary text-white font-normal rounded-full mr-1 px-6">
        Add to Registration
      </Button>
    </div>
  );
};
