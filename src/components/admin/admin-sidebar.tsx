"use client";

import type * as React from "react";
import {
//  Bell,
  MessageSquare,
  LogOut,
  Mail,
  Volleyball,
  TrafficCone,
} from "lucide-react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/slices/user-slice";
import { useDispatch } from "react-redux";
import Link from "next/link";
// Navigation data
const navigationItems = [
  {
    title: "Inquiries",
    url: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: TrafficCone,
  },
  {
    title: "Players",
    url: "/admin/players",
    icon: Volleyball,
  },
  {
    title: "Mailing List",
    url: "/admin/mailing-list",
    icon: Mail,
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch()
  const router = useRouter();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token"); 
      localStorage.removeItem("user");
      dispatch(clearUser())
      toast.success("Logged out successfully");
      router.push("/auth");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout error:", err);
    }
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-primary-foreground">
                  <Image
                    src="/logos/logo.png"
                    alt="icon"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin Panel</span>
                  <span className="truncate text-xs">Management</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

  
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                className="w-full justify-start hover:cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut />
                <span>Sign Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}