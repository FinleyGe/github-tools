import fs from "fs";
import path from "path";
import Bun from "bun";

const src = path.resolve(__dirname, "../src");
const dist = path.resolve(__dirname, "../dist");

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}
const entrypoints = fs
  .readdirSync(src)
  .map((file) => {
    if (file.endsWith(".ts")) {
      return path.resolve(src, file);
    }
  })
  .filter((file) => !!file) as string[];

await Bun.build({
  entrypoints,
  outdir: dist,
  target: "node",
});

console.log("Build complete:", entrypoints.join(", "));
