export type PostStatus = "draft" | "published";

export interface ContentBlock {
  type: string;
  data: {
    text?: string;
    [key: string]: unknown;
  };
}

export interface CreatePostDTO {
  title: string;
  excerpt: string;
  contentHtml: string;
  slug: string;
  contentBlocks: ContentBlock[];
  status: PostStatus;
  seoKeywords: string[];
  categoryId: string;
  tagIds: string[];
  coverImageUrl?: string;
  galleryImageUrls?: string[];
  publishedAt: Date | null;
}
export interface UpdatePostDTO {
  title?: string;
  excerpt?: string;
  contentHtml?: string;
  contentBlocks?: ContentBlock[];
  status?: PostStatus;
  seoKeywords?: string[];
  categoryId?: string;
  tagIds?: string[];
}
