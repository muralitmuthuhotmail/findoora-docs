import { ContentListPage } from "@/components/pages/content/content-list-page";
import { generatePageMetadata } from "@/lib/metadata";

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

  return <ContentListPage category={category} />;
}
