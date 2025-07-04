import { Skeleton } from "@/components/ui/skeleton"

export function BookTableSkeleton() {
  return (
    <div className="w-full">
      {/* Header skeleton */}
      <div className="flex items-center py-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[100px] ml-auto" />
      </div>
      <div className="rounded-md border">
        <div className="w-full divide-y divide-border">
         
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-7 items-center px-4 py-3 gap-4"
            >
              <Skeleton className="h-4 w-full" /> {/* Title */}
              <Skeleton className="h-4 w-full" /> {/* Author */}
              <Skeleton className="h-4 w-full" /> {/* Genre */}
              <Skeleton className="h-4 w-full" /> {/* ISBN */}
              <Skeleton className="h-4 w-8 mx-auto" /> {/* Copies */}
              <Skeleton className="h-4 w-20 mx-auto" /> {/* Availability */}
              <Skeleton className="h-6 w-6 mx-auto rounded" /> {/* Actions */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
