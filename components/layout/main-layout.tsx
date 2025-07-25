import dynamic from "next/dynamic";
import {
  SectionContent,
  SectionLayout,
} from "@/components/ui/layout/section-layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { AppBar } from "@/components/layout/app-bar";
import { NavigationSidebar } from "@/components/layout/navigation-sidebar";
import type { NavigationItem } from "@/components/layout/mobile-navigation";

const Search = dynamic(() =>
  import("@/components/features/search").then((mod) => ({
    default: mod.Search,
  })),
);

interface MainLayoutProps {
  children: React.ReactNode;
  navigationData?: NavigationItem[];
}

export function MainLayout({ children, navigationData = [] }: MainLayoutProps) {
  return (
    <>
      <SidebarProvider className="flex flex-col min-h-screen">
        <SkipToContent />
        {/* App Bar - Server Component */}
        <AppBar navigationData={navigationData} />
        <Search />

        <SidebarInset>
          <div className="flex w-full items-center justify-center px-4 py-3 transition-all duration-200 relative">
            <SectionLayout
              spacing="normal"
              align="left"
              className="pt-6 flex-row items-start justify-baseline mx-auto xl:mx-20 mt-0 w-full flex transition-all duration-200 ease-in-out"
            >
              {/* Desktop Sidebar - Server Component */}
              <aside
                className="min-w-xs h-fit sticky top-20 hidden lg:block mr-8"
                aria-label="Navigation sidebar"
              >
                <NavigationSidebar
                  navigationData={navigationData}
                  className="bg-muted/70 rounded-xl"
                />
              </aside>

              {/* Main Content */}
              <main
                id="main-content"
                className="space-y-1 sm:space-y-3 md:space-y-6 w-full min-h-full col-span-1 lg:col-span-8"
                role="main"
                aria-label="Main content"
              >
                <SectionContent>{children}</SectionContent>
              </main>
            </SectionLayout>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
