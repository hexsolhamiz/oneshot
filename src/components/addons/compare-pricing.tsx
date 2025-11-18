import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export const ComparePricing = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl text-primary mb-2 text-balance">
          COMPARE PRICING WITH BUNDLE PACKAGE
        </h1>
        <p className="text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
          nunc eu felis oiofend partitior. Praesent eu rutrum sem. Pellentesque
          rutrum ullamcorper viverra. Maecenas blandit facilisis odio, sit amet
          vehicula non.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="border border-primary p-1 rounded-2xl overflow-hidden">
        <div className="overflow-hidden border border-white rounded-2xl">
        {/* Header Row */}
        <div className="grid grid-cols-5 bg-primary text-white font-light text-md">
          <div className="p-4 border-primary flex justify-center">Add-On</div>
          <div className="p-4 border-primary flex justify-center">Highlight Video</div>
          <div className="p-4 border-primary flex justify-center">Pro Photos</div>
          <div className="p-4 border-primary flex justify-center">Football CV</div>
          <div className="p-4">Price</div>
        </div>

        {/* Data Rows */}
        <div className="font-light">
          {/* Individual Packages Row */}
          <div className="grid grid-cols-5 border-b  bg-white hover:bg-gray-50 transition-colors">
            <div className="p-4  text-sm">
              Individual Packages
            </div>
            <div className="p-4 flex items-center justify-center">
              <Checkbox checked  className="w-5 h-5" />
            </div>
            <div className="p-4 flex items-center justify-center">
              <Checkbox checked  className="w-5 h-5" />
            </div>
            <div className="p-4 flex items-center justify-center">
              <Checkbox checked  className="w-5 h-5" />
            </div>
            <div className="p-4 font-semibold text-primary">£119.97</div>
          </div>

          {/* Pro Player Pack Row */}
          <div className="grid grid-cols-5 bg-gray-50">
            <div className="p-4  text-sm">
              Pro Player Pack (Bundle)
            </div>
            <div className="p-4 flex items-center justify-center">
              <Checkbox checked  className="w-5 h-5" />
            </div>
            <div className="p-4 flex items-center justify-center">
              <Checkbox checked  className="w-5 h-5" />
            </div>
            <div className="p-4 flex items-center justify-center">
              <Checkbox checked  className="w-5 h-5" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-primary">£99.99</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary text-xs hover:text-purple-800 hover:bg-transparent gap-2"
              >
                Get the Pro Player Pack
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
