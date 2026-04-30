const projects = [
  {
    name: "RAG Assistant",
    description:
      "Retrieval-augmented assistant with a clean UX and fast document search.",
    repositoryUrl: "https://github.com/melkamzeranteneh/RAG",
    previewUrl: "",
  },
  {
    name: "VineForge",
    description:
      "Modern product experience focused on clarity, performance, and strong visuals.",
    repositoryUrl: "https://github.com/melkamzeranteneh/vinefordge",
    previewUrl: "",
  },
  {
    name: "BetterPhone",
    description:
      "Mobile-first interface experiments with practical component architecture.",
    repositoryUrl: "https://github.com/melkamzeranteneh/betterphone",
    previewUrl: "",
  },
];

export function ProjectsSection() {

  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Selected projects
          </h2>
        </div>
        {projects.length === 0 ? (
          <p className="text-sm text-foreground/60">
            No projects added yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-foreground backdrop-blur"
              >
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="mt-3 text-sm text-foreground/70">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <a
                    className="text-accent"
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Repository
                  </a>
                  {project.previewUrl ? (
                    <a
                      className="text-foreground/70"
                      href={project.previewUrl}
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
