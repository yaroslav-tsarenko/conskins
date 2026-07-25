import { Skeleton } from "@/components/ui/Skeleton";

export default function AnalyticsLoading() {
  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-10">
      <Skeleton className="h-6 w-40" rounded="full" />
      <Skeleton className="mt-3 h-9 w-96 max-w-full" />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} rounded="xl" className="h-24 w-full" />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-6">
          <Skeleton rounded="xl" className="h-[320px] w-full" />
          <Skeleton rounded="xl" className="h-[200px] w-full" />
        </div>
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} rounded="xl" className="h-[220px] w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
