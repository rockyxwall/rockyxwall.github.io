import { GITHUB_USERNAME } from '../config';

export interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

export async function getRepoData(repoName: string): Promise<GithubRepo | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
    if (!response.ok) {
      console.error(`Failed to fetch repo: ${repoName}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching repo ${repoName}:`, error);
    return null;
  }
}

export async function getAllProjects(repoNames: string[]) {
  const projects = await Promise.all(repoNames.map(name => getRepoData(name)));
  return projects.filter((p): p is GithubRepo => p !== null);
}
