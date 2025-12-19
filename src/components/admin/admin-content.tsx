"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import axiosInstance from "@/services/auth"
import {
  Bell,
  MessageSquare,
  Users,
} from "lucide-react"
import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface userGrowthDataType {
  month: string;
  users: number;
  newUsers: number;
}

export default function AdminComponent() {
  const [userGrowthData, setUserGrowthData] = useState<userGrowthDataType[]>([])
  const [remindersCount, setRemindersCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const stats = [
    {
      title: "Total Players",
      value: usersCount,
      icon: Users,
    },
    {
      title: "Total Inquiries",
      value: inquiriesCount,
      icon: MessageSquare,
    },
    {
      title: "Active Events",
      value: remindersCount,
      icon: Bell,
    },
  ]

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/admin/stats");
        // Update your state with the fetched data
         setUserGrowthData(response.data.stats.userGrowthData);
         setUsersCount(response.data.stats.usersCount);
         setInquiriesCount(response.data.stats.inquiriesCount);
         setRemindersCount(response.data.stats.remindersCount);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
   
      <div className="space-y-6 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">Dashboard</h1>
            <p className="text-muted-primary">Welcome back! Here&apos;s what&apos;s happening with your platform today.</p>
          </div>
        
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-primary font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-primary font-bold">{stat.value}</div>
               
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-1">
          {/* User Growth Chart */}
          <Card className="col-span-4 border-primary">
            <CardHeader>
              <CardTitle className="text-primary">Players Growth</CardTitle>
              <CardDescription>Total players and new registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: {
                    label: "Total Users",
                    color: "hsl(var(--chart-1))",
                  },
                  newUsers: {
                    label: "New Users",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="var(--color-users)"
                      strokeWidth={2}
                      name="Total Users"
                    />
                    <Line
                      type="monotone"
                      dataKey="newUsers"
                      stroke="var(--color-newUsers)"
                      strokeWidth={2}
                      name="New Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

       
        </div>
        
      </div>
  )
}