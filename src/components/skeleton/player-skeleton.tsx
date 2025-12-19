import { Skeleton } from "@/components/ui/skeleton";

export function PlayerProfileSkeleton() {
  return (
    <div className="w-full max-w-6xl bg-card rounded-2xl overflow-hidden shadow-lg">
      <div className="relative h-64 md:h-80 flex bg-gradient-to-b from-accent/20 to-transparent">
        {/* Image Skeleton */}
        <div className="relative w-[50%] h-full flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="p-6 md:p-8 w-full">
          {/* Name */}
          <Skeleton className="h-10 w-60 mb-6" />

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-7 w-20" />
            </div>

            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-7 w-24" />
            </div>

            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-7 w-28" />
            </div>

            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-7 w-24" />
            </div>

            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-7 w-24" />
            </div>

            <div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-7 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
