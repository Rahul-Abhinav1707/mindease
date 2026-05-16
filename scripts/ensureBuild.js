import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const distIndex = path.join(process.cwd(), "dist", "index.html");

if (!fs.existsSync(distIndex)) {
  console.log("Client build not found. Building Vite app before server start...");
  execFileSync("npm", ["run", "build"], {
    stdio: "inherit",
    shell: process.platform === "win32"
  });
}
