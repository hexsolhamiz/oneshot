"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  ContactFormValues,
} from "@/schemas/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import axiosInstance from "@/services/auth";

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setLoading(true);
      console.log(values);
      const response = await axiosInstance.post("/inquiries", values);
      if (response.status !== 201) {
        toast.error("Failed to send inquiry. Please try again.");
        setLoading(false);
        return;
      }
      toast.success("Your inquiry has been submitted!");
      form.reset();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact-form"className="my-8 mx-2 gap-6">
      <div className="max-w-4xl w-full mx-auto flex flex-col justify-center items-center">
        <h1 className="text-4xl text-primary">Send Us a Message</h1>
        <p className="text-sm text-center font-normal pb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare
          nunc eu felis eleifend porttitor.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto space-y-4"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Full name"
                      className="h-12 rounded-full border-2 border-black px-6 bg-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="h-12 rounded-full border-2 border-black px-6 bg-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Phone number*"
                      className="h-12 rounded-full border-2 border-black px-6 bg-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-12 w-full py-6 rounded-full border-2 border-black px-6 bg-transparent">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                        <SelectItem value="Technical Support">Technical Support</SelectItem>
                        <SelectItem value="Billing Question">Billing Question</SelectItem>
                        <SelectItem value="Feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write details here"
                    className="min-h-32 rounded-3xl border-2 border-black p-6 bg-transparent resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-black text-white font-medium rounded-full"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
