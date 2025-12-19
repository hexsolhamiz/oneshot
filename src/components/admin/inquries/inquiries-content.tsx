"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, User } from "lucide-react";
import { useDeleteInquiryMutation, useGetAllInquiriesQuery } from "@/store/slices/admin-slice";
import InquiryTableSkeleton from "@/components/skeleton/inquiry-skeleton";

// ✅ Static data instead of Redux
export default function InquiriesContent() {
  const { data, isLoading } = useGetAllInquiriesQuery(null);
  const [deleteInquiry] = useDeleteInquiryMutation();

  const handleDelete = (id : string) => {
   deleteInquiry(id)
   window.location.reload()
  }
  
  return (
    <div className="space-y-6 p-6 w-full max-w-[1300px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Inquiries
          </h1>
          <p className="text-black">Manage your customer inquiries here</p>
        </div>
      </div>

      {/* Inquiries Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-primary">All Inquiries</CardTitle>
              <CardDescription>
                Customer inquiries and support requests
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            {
              isLoading ? <InquiryTableSkeleton /> : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {
                  data?.map((inquiry, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="max-w-[200px]">
                          <p className="text-sm text-muted-foreground truncate">
                            {inquiry.email}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{inquiry.fullName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {inquiry.message.split(" ").slice(0, 10).join(" ")}...
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={ () => {
                              handleDelete(inquiry.id || "");
                            }} className="text-red-600">
                              Close Inquiry
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
            }
        
          </div>
        </CardContent>
      </Card>
    </div>
  );
}