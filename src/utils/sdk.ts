import { getOctokit } from "@actions/github";
import core from "@actions/core";

const token = core.getInput("token", { required: true });
export const github = getOctokit(token);
