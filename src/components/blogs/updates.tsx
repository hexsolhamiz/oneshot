"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axiosInstance from "@/services/auth";
import axios from "axios";

export const Updates = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email")?.toString();

      if (!email) {
        toast.error("Please enter a valid email address.");
        return;
      }

      const response = await axiosInstance.post("/admin/mails", { email });

      if (response.status === 201) {
        toast.success("Thanks for subscribing!");
      } else {
        toast.error(response.data?.error || "Failed to subscribe.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.info("You are already subscribed!");
        } else {
          toast.error(
            error.response?.data?.error ||
            "Something went wrong. Please try again."
          );
        }
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[400px] px-1 max-w-7xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-primary text-center text-4xl">
        Never Miss an Update
      </h1>
      <p className="font-normal text-center text-sm pb-3">
        Get the latest news, event dates, and success stories straight to your
        inbox.{" "}
      </p>
      <div className="flex items-center border border-black rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <form onSubmit={handleSubmit} className="flex w-full items-center">
          <Input
            type="email"
            placeholder="Enter Email Address"
            name="email"
            className="flex-1 border-0 bg-transparent px-6 py-4 text-gray-700 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
            required
          />
          <Button
            disabled={loading}
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
