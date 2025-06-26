import core from "@actions/core";
import { createOrUpdatePRComment } from "./issue-comment";

async function main() {
  core.debug("running action");
  const tool = core.getInput("tool", { required: true });
  if (!tool) {
    core.setFailed("tool is required");
    return;
  }

  switch (tool) {
    case "issue-comment":
      await createOrUpdatePRComment();
      break;
    default:
      core.setFailed(`Unknown tool: ${tool}`);
      break;
  }
}

main().catch((error) => {
  core.debug(error);
  core.setFailed(error);
});
