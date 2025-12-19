"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/services/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.replace("/auth");

      try {
        const res = await axiosInstance.get("/users/me");
        console.log(res);
        const role = res.data.role;
   
        if (role !== "ADMIN") {
          return router.replace("/");
        }

        setAuthorized(true);
      } catch {
        localStorage.removeItem("token");
        router.replace("/auth");
      }
    };

    checkAdmin();
  }, [router]);

  if (!authorized) return <div></div>;

  return (
    <div className="AdminLayout flex">
        <SidebarProvider>
          <AdminSidebar />
          <SidebarTrigger />
          <main className="flex-1 p-4">{children}</main>
        </SidebarProvider>
    </div>
  );
}
