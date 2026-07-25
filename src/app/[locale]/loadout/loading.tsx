import { Skeleton } from "@/components/ui/Skeleton";

export default function LoadoutLoading() {
  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-10">
      <Skeleton className="h-6 w-40" rounded="full" />
      <Skeleton className="mt-3 h-9 w-96 max-w-full" />
      <Skeleton className="mt-2 h-4 w-full max-w-2xl" />
      <div className="mt-8 flex items-center justify-between">
        <Skeleton rounded="lg" className="h-10 w-64" />
        <Skeleton rounded="lg" className="h-10 w-40" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} rounded="xl" className="h-44 w-full" />
        ))}
      </div>
    </div>
  );
}
