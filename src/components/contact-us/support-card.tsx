import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function SupportCards() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone Support Card */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 text-start space-y-4">
            <div className="flex justify-start">
              <Image
                src="/icons/phone.png"
                alt="WhatsApp Icon"
                width={60}
                height={60}
                className="text-primary"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-">Phone Support</h3>
              <p className="text-sm text- leading-relaxed">
                Speak to our team directly on Whatsapp.
                <br />
                Lines open 7 days a week.
              </p>
            </div>
            <div className="pt-2">
              <p className="text-sm font-semibold text-primary">
                Call us: 0000000
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Live Chat Card */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 text-start space-y-4">
            <div className="flex justify-start">
              <Image
                src="/icons/contact.png"
                alt="Phone Icon"
                width={60}
                height={60}
                className="text-primary"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-">Live Chat</h3>
              <p className="text-sm text- leading-relaxed">
                Available on the bottom-right of
                <br />
                every page. Fast replies from
                <br />
                real agents (not bots).
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Email Us Card */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 text-start space-y-4">
            <div className="flex justify-start">
              <Image
                src="/icons/inbox.png"
                alt="Phone Icon"
                width={60}
                height={60}
                className="text-primary"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-">Email Us</h3>
              <div className="text-sm text-black space-y-1">
                <div>
                  <span className="font-semibold text-primary">
                    General enquiries:
                  </span>
                  <br />
                  <span>hello@emailhere.co.uk</span>
                </div>
                <div>
                  <span className="font-semibold text-primary">Support:</span>
                  <br />
                  <span>hello@emailhere.co.uk</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
