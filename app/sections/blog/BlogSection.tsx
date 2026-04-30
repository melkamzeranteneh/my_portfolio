const posts = [
  {
    title: "Designing for speed",
    excerpt: "How to layer motion and performance without trade-offs.",
    size: "large",
  },
  {
    title: "Three.js lighting",
    excerpt: "Creating depth with neon accents.",
    size: "medium",
  },
  {
    title: "Content pipelines",
    excerpt: "MDX workflows that feel invisible.",
    size: "medium",
  },
  {
    title: "Minimal UX",
    excerpt: "Less UI, more focus.",
    size: "small",
  },
];

export function BlogSection() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Writing
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.title}
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 text-foreground ${
                post.size === "large"
                  ? "sm:col-span-2"
                  : post.size === "small"
                  ? "sm:col-span-1"
                  : "sm:col-span-1"
              }`}
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="mt-3 text-sm text-foreground/70">{post.excerpt}</p>
              <button className="mt-6 text-sm font-semibold text-accent">
                Read more
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
