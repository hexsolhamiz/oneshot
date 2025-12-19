"use client";
import { useState } from "react";
import { InputSearch } from "./input-search";
import TrialCard from "../home/trials/trials-card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { trials } from "@/data/trials";

export const UpcomingTrials = () => {
  const [city, setCity] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    setSearchValue(city.toLowerCase());
  };

  // Filter trials
  const filteredTrials = trials.filter((t) =>
    t.details.city.toLowerCase().includes(searchValue)
  );


  return (
    <div className=" w-full max-w-7xl mx-auto min-h-[500px] lg:mt-0 mt-14 flex flex-col items-center justify-center">
      <h1 className="text-4xl text-primary text-center">UPCOMING TRIALS</h1>
      <p className="text-md font-light text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
        nunc eu felis eleifend porttito Eraesent eu rutrum sem.
      </p>
      <InputSearch city={city} setCity={setCity} onSearch={handleSearch} />

<div className="mx-2">
      <div
        className="w-full max-w-6xl mx-auto gap-4 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-3 auto-rows-auto"
      >

        {filteredTrials.length > 0 ? (
          filteredTrials.map((trial) => (
            <TrialCard key={trial.id} stadium={trial} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No trials found for {city}.
          </p>
        )}
        {/* CTA item */}
        <div
          className="min-h-80 py-6 lg:py-0 rounded-3xl w-full bg-black lg:col-start-2 lg:col-end-5 lg:row-start-3 lg:row-end-4 bg-center bg-no-repeat flex flex-col justify-center px-8"
          style={{ backgroundImage: "url('/about/why.png')" }}
        >
          <h1 className="text-6xl text-white">Can&apos;t Find Your City?</h1>
          <p className="text-white text-lg">
            We&apos;re expanding to new cities soon.{" "}
          </p>
          <p className="text-white text-lg">
            Join our mailing list to be notified when we launch near you.
          </p>

          <div className="max-w-md my-2 flex py-1 items-center gap-0 bg-transparent rounded-full border border-white shadow-sm overflow-hidden">
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter email address"
              className="flex-1 border-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            />

            <Button
              onClick={handleSearch}
              className="bg-primary text-white font-normal rounded-full mr-1 px-6"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
</div>
      <div className="min-h-[300px] flex flex-col items-center justify-center">
        <h1 className="text-primary text-3xl text-center">Ready to Take Your Shot?</h1>
        <p className="text-center">
          Spots are limited and fill fast — secure your place at the next
          OneShot Trial.
        </p>
        <Button className="my-3 bg-primary text-white font-normal rounded-full mr-1 px-6">
          Register Now
        </Button>
      </div>
    </div>
  );
};
