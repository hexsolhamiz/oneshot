import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function UsersSkeleton() {
  return (
    <div className="space-y-6 p-6 w-full max-w-[1300px]">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-24 bg-purple-300/40" />
        <Skeleton className="h-4 w-56 mt-2 bg-yellow-300/40" />
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-28 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 border-b p-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-20" />
              ))}
            </div>

            {/* Table Rows */}
            <div className="divide-y">
              {[...Array(6)].map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid grid-cols-5 gap-4 items-center p-4"
                >
                  {/* ID */}
                  <Skeleton className="h-4 w-12" />

                  {/* Name */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>

                  {/* Role */}
                  <Skeleton className="h-6 w-16 rounded-full" />

                  {/* Actions */}
                  <div className="text-right">
                    <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}