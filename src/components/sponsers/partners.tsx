import React from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
export const Partners = () => {
  return (
    <div className="min-h-[400px] my-16 w-full max-w-7xl mx-auto flex gap-2 flex-col items-center justify-center">
      <h1 className="text-6xl text-primary text-center">
        Why Partner with OneShot?
      </h1>
      <p className="text-sm max-w-4xl mx-auto text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
        nunc eu felis eleifend porttitor. Praesent eu rutrum sem. Pellentesque
        rutrum ullamcorper viverra. Maecenas blandit facilisis odio, sit amet
        vehicula non.{" "}
      </p>

      <div className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone Support Card */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 text-start space-y-4">
            <div className="flex justify-start">
              <Image
                src="/sponsors/reach.png"
                alt="WhatsApp Icon"
                width={30}
                height={30}
                className="text-primary"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">
                Reach the Next Generation
              </h3>
              <p className="text-sm text- leading-relaxed">
                Connect with thousands of aspiring athletes aged 16-26 through
                national exposure.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Live Chat Card */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 text-start space-y-4">
            <div className="flex justify-start">
              <Image
                src="/sponsors/football.png"
                alt="Phone Icon"
                width={30}
                height={30}
                className="text-primary"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">
                High Visibility Campaigns
              </h3>
              <p className="text-sm text- leading-relaxed">
                Your brand will feature on kits, banners, digital media, and
                highlight videos.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Email Us Card */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 text-start space-y-4">
            <div className="flex justify-start">
              <Image
                src="/sponsors/footballer.png"
                alt="Phone Icon"
                width={30}
                height={30}
                className="text-primary"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">
                Community Impact
              </h3>
              <div className="text-sm text-black space-y-1">
                <div>
                  <p className="text-sm text- leading-relaxed">
                    Support fair, accessible opportunities for all young players
                    across the UK.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
