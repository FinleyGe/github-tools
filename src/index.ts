import core from "@actions/core";
import { createOrUpdatePRComment } from "./issue-comment";

async function main() {
  const params = core.getInput("params", { required: false });
  const tool = core.getInput("tool", { required: true });

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
  core.setFailed(error);
});
