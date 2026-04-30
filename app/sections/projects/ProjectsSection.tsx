import { fetchGitHubRepos } from "@/app/lib/github";

export async function ProjectsSection() {
  const repos = await fetchGitHubRepos();

  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Selected projects
          </h2>
          <span className="text-sm text-foreground/60">
            GitHub sync active
          </span>
        </div>
        {repos.length === 0 ? (
          <p className="text-sm text-foreground/60">
            No GitHub data available yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {repos.map((repo) => (
              <article
                key={repo.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-foreground backdrop-blur"
              >
                <h3 className="text-lg font-semibold">{repo.name}</h3>
                <p className="mt-3 text-sm text-foreground/70">
                  {repo.description ?? "Description coming soon."}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <a
                    className="text-accent"
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Repository
                  </a>
                  {repo.homepage ? (
                    <a
                      className="text-foreground/70"
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live preview
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
