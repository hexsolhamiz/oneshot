import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const Updates = () => {
  return (
    <div className="min-h-[400px] max-w-7xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-primary text-4xl">
        Never Miss an Update
      </h1>
      <p className="font-normal text-sm pb-3">
        Get the latest news, event dates, and success stories straight to your
        inbox.{" "}
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
  );
};
