"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MoveLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Login } from "./login";
import { Register } from "./register";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full lg:min-w-lg shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="relative flex justify-center">
            <Link href="/">
              <MoveLeft className="hidden lg:block absolute left-0 top-5 hover:cursor-pointer h-6 w-6 text-black " />
            </Link>

            <Link href="/">
              <Image
                width={150}
                height={150}
                src="/logos/footer-logo.png"
                alt=""
                className="hover:cursor-pointer"
              />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 items-center">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Login
              </TabsTrigger>

              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            <div className="w-full max-w-md mx-auto">
              <TabsContent
                value="login"
                className=" w-full max-h-[250px] min-h-[280px] space-y-4 mt-3"
              >
                <Login />
              </TabsContent>

              <TabsContent
                value="signup"
                className=" w-full max-h-[280px] overflow-scroll overflow-x-hidden space-y-4 mt-6"
              >
                <Register />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
