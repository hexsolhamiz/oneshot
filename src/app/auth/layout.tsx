"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/auth";
import { Loader2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setChecking(false);
        console.log(checking)
        return
      }

      try {
        const res = await axiosInstance.get("/users/me");
        const role = res.data.role;
        console.log(role)
        // Redirect if user is already logged in
        if (role === "ADMIN") {
          return router.replace("/admin");
        } else {
          return router.replace("/");
        }
      } catch {
        // Token is invalid, allow access to auth page
        localStorage.removeItem("token");
        setChecking(false);
      }
    };

    checkIfAuthenticated();
  }, [router, checking]);

  if (checking) return <div className="w-full  flex py-4 justify-center"> <Loader2  className="text-secondary w-6 h-6 animate-spin"/></div>;

  return <>{children}</>;
}