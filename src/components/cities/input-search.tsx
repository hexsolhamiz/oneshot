"use client"
import { Sliders } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export const InputSearch = () => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", city);
  };

  return (
    <div className="w-full my-2 max-w-lg px-4">
      <div className="flex py-1 items-center gap-0 bg-white rounded-full border border-primary shadow-sm overflow-hidden">
        {/* Left Icon */}
        <div className="flex items-center border-r-2 border-primary justify-center w-14 pl-3">
          <Sliders className="w-5 h-5 text-primary" strokeWidth={1.5} />
        </div>

        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City..."
          className="flex-1 border-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
        />

        <Button
          onClick={handleSearch}
          className="bg-primary text-white font-medium rounded-full mr-1 px-6"
        >
          Search
        </Button>
      </div>
    </div>
  );
};
