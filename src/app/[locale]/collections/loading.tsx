import { Skeleton } from "@/components/ui/Skeleton";

export default function CollectionsLoading() {
  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-10">
      <Skeleton className="h-6 w-40" rounded="full" />
      <Skeleton className="mt-3 h-9 w-96 max-w-full" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} rounded="xl" className="h-36 w-full" />
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} rounded="xl" className="h-28 w-full" />
        ))}
      </div>
    </div>
  );
}
