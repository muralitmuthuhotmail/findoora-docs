export interface ContentMetadata {
  thumbnail?: string;
  banner?: string;
  menuTitle: string;
  menuIcon?: string;
  title: string;
  publishedAt?: string;
  summary?: string;
  image?: string;
  category?: string;
  author?: string;
  tags?: string[];
  hasDataTables?: boolean;
  supportsGfm?: boolean;
  sequence?: number;
}

export interface ContentPost {
  metadata: ContentMetadata;
  slug: string;
  content: string;
}

export interface ContentMeta {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  image: string;
}

export interface HeadingItem {
  level: number;
  text: string;
  id: string;
  children: HeadingItem[];
}

export interface TableOfContentsProps {
  content: string;
  title?: string;
  summary?: string;
  className?: string;
  scrollable?: boolean;
}
