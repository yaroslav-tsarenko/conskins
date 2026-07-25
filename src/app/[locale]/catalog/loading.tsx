import { Skeleton } from "@/components/ui/Skeleton";

export default function CatalogLoading() {
  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-8">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="mt-3 h-4 w-96 max-w-full" />
      <div className="mt-8 flex gap-8">
        <div className="hidden w-[268px] shrink-0 flex-col gap-4 lg:flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} rounded="lg" className="h-28 w-full" />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <Skeleton className="mb-4 h-10 w-full" rounded="lg" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} rounded="xl" className="aspect-[3/4] w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
