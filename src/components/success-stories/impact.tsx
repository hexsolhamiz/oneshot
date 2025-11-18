import React from "react";

export const Impact = () => {
  return (
    <div className="w-full max-w-7xl my-6 mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl text-primary mb-2 text-balance">
          The Impact of OneShot{" "}
        </h1>
      </div>

      {/* Pricing Table */}
      <div className="border border-primary p-1 rounded-2xl overflow-hidden">
        <div className="overflow-hidden border border-white rounded-2xl">
          {/* Header Row */}
          <div className="grid grid-cols-3 bg-primary text-white font-light text-md">
            <div className="p-4 border-primary flex justify-start">
              Metric
            </div>
            <div className="p-4 border-primary flex justify-center">
              Number 
            </div>
            <div className="p-4 border-primary flex justify-center">
              Description
            </div>
          </div>

          {/* Data Rows */}
          <div className="font-light">
            <div className="grid grid-cols-3 border-b  bg-white hover:bg-gray-50 transition-colors">
              <div className="p-4  text-sm">Players Scouted</div>
              <div className="p-4 flex items-center justify-center">
                200+
              </div>
              <div className="p-4 flex items-center justify-center">
                Selected by clubs nationwide
              </div>
            </div>

            <div className="grid grid-cols-3 bg-gray-50">
              <div className="p-4  text-sm">Cities Hosted</div>
              <div className="p-4 flex items-center justify-center">
                9
              </div>
              <div className="p-4 flex items-center justify-center">
                Across the UK
              </div>             
            </div>

            <div className="grid grid-cols-3 bg-gray-50">
              <div className="p-4  text-sm">Highlight Videos Delivered</div>
              <div className="p-4 flex items-center justify-center">
               1,500+
              </div>
              <div className="p-4 flex items-center justify-center">
                Professional media assets created
              </div>             
            </div>

            <div className="grid grid-cols-3 bg-gray-50">
              <div className="p-4  text-sm">Success Rate</div>
              <div className="p-4 flex items-center justify-center">
                25%
              </div>
              <div className="p-4 flex items-center justify-center">
                Players received club invitations or callbacks
              </div>             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
