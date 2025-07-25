import Footer from "@/components/layout/footer";
import { MainLayout } from "@/components/layout/main-layout";
import { NavigationItem } from "@/components/layout/mobile-navigation";
import { Providers } from "@/components/providers";
import { getContentPosts } from "@/lib/content";
import { defaultMetadata } from "@/lib/metadata";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/app-shell";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-side data fetching for navigation
  const contentPosts = getContentPosts();
  const categories = Array.from(
    new Set(
      contentPosts.map((post) => post.metadata.category || "Uncategorized"),
    ),
  );

  const navigationData: NavigationItem[] = categories.map((category) => ({
    title: category.charAt(0).toUpperCase() + category.slice(1),
    url: `/${category}`,
    items: contentPosts
      .filter(
        (post) => (post.metadata.category || "Uncategorized") === category,
      )
      .map((subPost) => ({
        title: subPost.metadata.menuTitle || subPost.metadata.title,
        url: `/${subPost.metadata.category}/${subPost.slug}`,
      })),
  }));

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${fontSans.variable} ${fontMono.variable}`,
          `font-sans antialiased relative`,
        )}
      >
        <Providers>
          <AppShell>
            <MainLayout navigationData={navigationData}>{children}</MainLayout>
            <Footer />
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
