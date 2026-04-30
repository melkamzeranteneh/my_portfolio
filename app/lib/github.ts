export type GitHubRepo = {
  name: string;
  description: string | null;
  homepage?: string | null;
  html_url: string;
};

const GITHUB_OWNER = "melkamzeranteneh";
const REPOS = ["RAG", "vinefordge", "betterphone"];

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const repos = await Promise.all(
    REPOS.map(async (repo) => {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${repo}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        return null;
      }

      return (await response.json()) as GitHubRepo;
    })
  );

  return repos.filter((repo): repo is GitHubRepo => repo !== null);
}
