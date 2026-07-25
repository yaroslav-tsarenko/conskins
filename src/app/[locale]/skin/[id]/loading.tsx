import { Skeleton } from "@/components/ui/Skeleton";

export default function SkinLoading() {
  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-8">
      <Skeleton className="h-4 w-72 max-w-full" />
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-4">
          <Skeleton rounded="xl" className="aspect-[4/3] w-full" />
          <Skeleton rounded="lg" className="h-24 w-full" />
          <Skeleton rounded="lg" className="h-20 w-full" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton rounded="lg" className="h-40 w-full" />
          <Skeleton rounded="lg" className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
