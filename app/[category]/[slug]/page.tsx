import { ContentPage } from "@/components/pages/content/content-page";
import { getContentPost, getContentPosts } from "@/lib/content";
import { generateContentPostMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

import { BASE_URL } from "@/lib/config";

export async function generateStaticParams() {
  const posts = getContentPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getContentPost(slug);

  if (!post) {
    return {
      title: "Content Not Found",
      description: "The requested content post could not be found.",
    };
  }

  return generateContentPostMetadata(post);
}

export default async function ContentPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getContentPost(slug);

  if (!post) {
    redirect(`/not-found`);
  }

  return <ContentPage post={post} baseUrl={BASE_URL} />;
}
