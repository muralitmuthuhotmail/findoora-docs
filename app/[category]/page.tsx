import { ContentListPage } from "@/components/pages/content/content-list-page";
import { generatePageMetadata } from "@/lib/metadata";
import NotFound from "../not-found";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return generatePageMetadata(
    category.charAt(0).toUpperCase() + category.slice(1),
    `Explore our ${category} content, including insights and tutorials on modern web development, TypeScript, React, and software engineering best practices.`,
    `/${category}`,
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (
    !category ||
    !category.match(/^[a-zA-Z0-9-]+$/) ||
    category == "not-found"
  ) {
    return <NotFound />;
  }

  return <ContentListPage category={category} />;
}
