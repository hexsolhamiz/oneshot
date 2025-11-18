"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  return (
    <>
      <div className="my-8 gap-6">
        <div className="max-w-4xl w-full mx-auto flex flex-col justify-center items-center">
          <h1 className="text-4xl text-primary">Send Us a Message</h1>
          <p className="text-sm font-normal pb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
            nunc eu felis eleifend porttito Eraesent eu rutrum sem.
          </p>
        </div>

        <form className="max-w-4xl  mx-auto space-y-4">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                placeholder="Full name"
                className="h-12 rounded-full border-2 border-black px-6 bg-transparent"
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email address"
                className="h-12 rounded-full border-2 border-black px-6 bg-transparent"
              />
            </div>
          </div>

          {/* Phone & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="tel"
                placeholder="Phone number*"
                className="h-12 rounded-full border-2 border-black px-6 bg-transparent"
              />
            </div>

            <div>
              <Select>
                <SelectTrigger className="h-12 w-full py-6 rounded-full border-2 border-black px-6 bg-transparent">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Inquiry">
                    General Inquiry
                  </SelectItem>
                  <SelectItem value="Technical Support">
                    Technical Support
                  </SelectItem>
                  <SelectItem value="Billing Question">
                    Billing Question
                  </SelectItem>
                  <SelectItem value="Feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div>
            <Textarea
              placeholder="Write details here"
              className="min-h-32 text-white rounded-3xl border-2 hover:cursor-pointer border-black p-6 bg-transparent resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-black text-white font-medium rounded-full"
          >
            Send Message
          </Button>
        </form>
      </div>
    </>
  );
}
