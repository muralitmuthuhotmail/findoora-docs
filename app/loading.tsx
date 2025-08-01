import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <section>
      <h2 id="content-posts-heading" className="sr-only">
        Loading content posts
      </h2>
      <article className="grid grid-cols-1 md:grid-cols-10 gap-4 dark:bg-background p-4 rounded-xl">
        <div className="col-span-1 md:col-span-7 pr-0 md:p-4 bg-card dark:bg-background rounded-xl">
          <Skeleton className="mb-6 h-8 w-3/4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="group col-span-1 bg-card/70 rounded-xl shadow-sm border border-border flex flex-row h-32 items-stretch"
              role="listitem"
              tabIndex={-1}
            >
              <div className="relative h-full w-28 flex-shrink-0 rounded-l-xl overflow-hidden flex justify-center items-center p-2 bg-gradient-to-br from-accent/20 to-primary/10">
                {/* <Skeleton className="h-24 w-24 rounded-lg" /> */}
              </div>
              <div className="flex flex-col flex-1 p-3 md:p-4 space-y-1 justify-between min-w-0">
                <Skeleton className="h-5 w-3/4 mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <div className="flex items-center justify-between pt-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-14" />
                </div>
              </div>
            </div>
          ))}
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
