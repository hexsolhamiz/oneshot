"use client";
import { loginSchema } from "@/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Mail, Lock, EyeOff, Loader2, Eye } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import axiosInstance from "@/services/auth";
import { useRouter } from "next/navigation";

type LoginFormData = z.infer<typeof loginSchema>;
export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await axiosInstance.post("/users/login", data);
      const result = response.data;
      if(response.status !== 200) {
      toast.error("Login failed! Incorrect Password or Email");
      setLoading(false);
      return;
      }
      console.log(data);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.user.token);
      toast.success("Login successful!");
        if (result?.user.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          window.location.href = "/"
        }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ error: string }>;
      const message =
        axiosError.response?.data?.error ||
        "Login failed! Incorrect Password or Email";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          className=" space-y-4 w-full"
        >
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-10"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="flex items-center justify-between">
            <Link href="/account/reset-password">
              <Button
                type="button"
                variant="link"
                className="px-0 font-normal text-sm hover:cursor-pointer"
              >
                Forgot password?
              </Button>
            </Link>
          </div> */}

          <Button type="submit" className="w-full hover:cursor-pointer">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span>Sign In</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
