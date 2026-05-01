import Link from "next/link";
import { fetchArticles } from "@/app/lib/mdx";
import { BlogCards } from "./BlogCards";

export async function BlogSection() {
  const posts = await fetchArticles();

  return (
    <section id="writing" className="w-full px-6 py-24 bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Field Notes / Writing
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
            Technical <span className="text-muted">Journal</span>
          </h2>
        </div>
        {posts.length === 0 ? (
          <p className="text-[10px] text-muted italic">
            Synchronizing data streams...
          </p>
        ) : (
          <BlogCards posts={posts} />
        )}
        <div className="pt-4">
          <Link
            href="/articles"
            className="game-button px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition"
          >
            Archive Access
          </Link>
        </div>
      </div>
    </section>
  );
}

