export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
};

export async function fetchArticles(): Promise<ArticleMeta[]> {
  return [];
}
