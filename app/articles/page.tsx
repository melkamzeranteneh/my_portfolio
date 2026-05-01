import Link from "next/link";
import { fetchArticles } from "@/app/lib/mdx";

export const metadata = {
  title: "Archive | ULTRA DEV",
  description: "Technical documentation and engineering insights.",
};

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-foreground selection:bg-accent selection:text-black">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <Link href="/" className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent transition hover:text-white">
          <span>← Back</span>
        </Link>

        <header className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60">Archive / Logs</p>
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase">Technical <span className="text-muted">Journal</span></h1>
          <p className="max-w-xl text-sm text-muted leading-relaxed">
            Notes on engineering, architecture, and performance.
          </p>
        </header>

        {articles.length === 0 ? (
          <div className="border border-white/5 rounded-sm p-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted italic">
              No Data Nodes Found
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="game-panel group rounded-sm p-8 border border-white/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent/60">{article.readingTime}</p>
                  <div className="h-[1px] w-6 bg-white/5" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors uppercase">
                  {article.title}
                </h2>
                <p className="mt-4 text-[13px] leading-relaxed text-muted max-w-2xl">
                  {article.excerpt}
                </p>
                <div className="mt-8 pt-4 border-t border-white/5">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline transition"
                  >
                    Access Log →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
