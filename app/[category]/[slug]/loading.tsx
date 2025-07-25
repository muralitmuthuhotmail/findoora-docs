import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <section>
      <article className="grid grid-cols-1 md:grid-cols-10 gap-4 dark:bg-background p-4 rounded-xl">
        <div className="col-span-1 md:col-span-7 pr-0 md:p-4 bg-card dark:bg-background rounded-xl">
          <Skeleton className="w-full h-68 rounded-xl p-4 mb-4" />
          <Skeleton className="mb-4 h-5 w-32" />
          <Skeleton className="mb-6 h-8 w-3/4" />
          <Skeleton className="mb-8 h-4 w-24" />
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 md:sticky md:top-20 rounded-xl bg-card dark:bg-background h-fit p-6 w-full hidden md:block">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
