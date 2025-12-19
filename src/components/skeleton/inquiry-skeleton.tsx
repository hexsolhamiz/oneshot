import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // adjust import path if your project places shadcn components elsewhere
// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
  rows?: number;
};

export default function InquiryTableSkeleton({ rows = 5 }: Props) {
  const placeholders = Array.from({ length: rows });

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Message</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {placeholders.map((_, idx) => (
          <TableRow key={idx} className="animate-pulse">
            <TableCell>
              <div className="max-w-[200px]">
                <div className="h-4 w-40 rounded-md bg-muted/40" />
              </div>
            </TableCell>

            <TableCell>
              <div className="flex items-center space-x-2">
                {/* avatar circle skeleton */}
                <div className="h-4 w-4 rounded-full bg-muted/40" />
                <div className="h-4 w-28 rounded-md bg-muted/40" />
              </div>
            </TableCell>

            <TableCell>
              <div className="h-4 w-72 rounded-md bg-muted/40" />
            </TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end">
                {/* action button skeleton */}
                <div className="h-8 w-8 rounded-md bg-muted/40" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Usage:
// import InquiryTableSkeleton from "./InquiryTableSkeleton";
// <InquiryTableSkeleton rows={6} />