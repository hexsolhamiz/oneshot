import AuthForm from "@/components/auth/auth-form";
import React from "react";

const page = () => {
  return (
    <div
      className="min-h-screen h-screen w-full flex justify-end 
                 bg-no-repeat 
                 lg:bg-[url('/auth/auth-bg.png')] 
                 bg-none lg:bg-cover"
    >
      <div className="lg:w-[50%] w-full flex items-center justify-center">
      <AuthForm />
      </div>
    </div>
  );
};

export default page;
