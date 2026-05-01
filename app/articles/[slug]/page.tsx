import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchArticleBySlug, fetchArticles } from "@/app/lib/mdx";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await fetchArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return { title: "404 | ULTRA DEV" };
  }

  return {
    title: `${article.meta.title} | ULTRA DEV`,
    description: article.meta.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-4 py-32 text-foreground selection:bg-accent selection:text-black">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <Link href="/articles" className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent transition hover:text-white">
            <span>← Archive</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={`/assets/articles/${article.meta.slug}.md`}
              target="_blank"
              rel="noreferrer"
              className="text-[9px] font-bold uppercase tracking-widest text-muted hover:text-accent transition"
            >
              Markdown
            </a>
            <div className="h-3 w-[1px] bg-white/10" />
            <p className="text-[9px] font-bold uppercase tracking-widest text-accent/60">
              UID: {article.meta.slug.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="grid gap-10 xl:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <header className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-1 bg-accent" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  {article.meta.readingTime}
                </p>
              </div>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl uppercase tracking-tight">
                {article.meta.title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted">
                {article.meta.excerpt}
              </p>
            </header>

            <div className="game-panel rounded-sm p-8 sm:p-12 border border-white/5">
              <div className="article-doc" dangerouslySetInnerHTML={{ __html: article.html }} />
            </div>
          </div>

          {article.headings.length > 1 ? (
            <aside className="hidden xl:block">
              <div className="sticky top-32 space-y-6">
                <div className="game-panel rounded-sm p-6 border border-white/5">
                  <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-accent">
                    Index
                  </p>
                  <nav className="space-y-3">
                    {article.headings
                      .filter((heading) => heading.level <= 3)
                      .map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className={`group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-accent ${
                            heading.level === 3 ? "ml-3 text-muted/50" : "text-muted"
                          }`}
                        >
                          <div className="h-0.5 w-0.5 rounded-full bg-white/10 group-hover:bg-accent" />
                          <span>{heading.text}</span>
                        </a>
                      ))}
                  </nav>
                </div>
                
                <div className="p-6 border border-white/5 rounded-sm">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                    Information
                  </p>
                  <p className="mt-3 text-[9px] font-medium leading-relaxed text-muted/40 uppercase tracking-widest">
                    Synchronized documentation node for the current production environment.
                  </p>
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </main>
  );
}
