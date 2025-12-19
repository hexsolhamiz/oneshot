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
import { MoreHorizontal } from "lucide-react";
import { useDeleteMailMutation, useGetAllMailersQuery } from "@/store/slices/admin-slice";
import InquiryTableSkeleton from "@/components/skeleton/inquiry-skeleton";

// ✅ Static data instead of Redux
export default function MailingContent() {
  const { data, isLoading } = useGetAllMailersQuery(null);
  const [deleteMail] = useDeleteMailMutation();

  const handleDelete = (id : string) => {
   deleteMail(id)
   window.location.reload()
  }
  
  return (
    <div className="space-y-6 p-6 w-full max-w-[1300px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Mails
          </h1>
          <p className="text-black">Here are all the emails for email marketing.</p>
        </div>
      </div>

      {/* Inquiries Table */}
      <Card>
        <CardHeader>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            {
              isLoading ? <InquiryTableSkeleton /> : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {
                  data?.map((inquiry, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {<p className="text-sm text-muted-foreground truncate">
                            {inquiry.id}
                          </p>}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">
                          <p className="text-sm text-muted-foreground truncate">
                            {inquiry.email}
                          </p>
                        </div>
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
                              Delete Mail
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