import { context } from "@actions/github";
import core from "@actions/core";
import { github } from "./utils/sdk";

export async function createOrUpdatePRComment(): Promise<void> {
  const title = core.getInput("title", { required: false });
  const body = core.getInput("body", { required: true });

  const marker = `<!-- ${title} -->` || "<!-- Comment by Github Tools-->";
  if (!context.payload.pull_request) {
    throw new Error("This action can only be run on a pull request event");
  }

  const { owner, repo } = context.repo;
  const issue_number = context.payload.pull_request.number;

  // List all comments on the PR
  const comments = await github.rest.issues.listComments({
    owner,
    repo,
    issue_number,
  });

  // Try to find a comment matching the marker (usually a hidden HTML comment)
  const existingComment = comments.data.find((comment) =>
    comment.body?.includes(marker),
  );

  if (existingComment) {
    // Update the existing comment
    await github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existingComment.id,
      body: `${title ? `<h1>${title}</h1>\n\n` : ""}${body}\n\n${marker}`,
    });
  } else {
    // Create a new comment with the marker appended
    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body: `${title ? `<h1>${title}</h1>\n\n` : ""}${body}\n\n${marker}`,
    });
  }
}
