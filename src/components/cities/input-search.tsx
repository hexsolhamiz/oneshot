"use client";
import { Sliders } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const InputSearch = ({
  city,
  setCity,
  onSearch,
}: {
  city: string;
  setCity: (value: string) => void;
  onSearch: () => void;
}) => {
  return (
    <div className="w-full my-2 max-w-lg px-4">
      <div className="flex py-1 items-center gap-0 bg-white rounded-full border border-primary shadow-sm overflow-hidden">

        <div className="flex items-center border-r-2 border-primary justify-center w-14 pl-3">
          <Sliders className="w-5 h-5 text-primary" strokeWidth={1.5} />
        </div>

        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City..."
          className="flex-1 border-0 outline-none bg-transparent"
        />

        <Button
          onClick={onSearch}
          className="bg-primary text-white font-medium rounded-full mr-1 px-6"
        >
          Search
        </Button>
      </div>
    </div>
  );
};
