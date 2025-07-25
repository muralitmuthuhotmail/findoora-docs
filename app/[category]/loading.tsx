import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
  return (
    <section aria-labelledby="content-posts-heading" className="">
      <h2 id="content-posts-heading" className="sr-only">
        Loading content posts
      </h2>
      <div role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
    </section>
  );
}
