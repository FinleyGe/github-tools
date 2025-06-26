import { getOctokit } from "@actions/github";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  throw new Error("Missing GITHUB_TOKEN");
}

export const github = getOctokit(token);
