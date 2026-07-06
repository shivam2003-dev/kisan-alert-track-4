import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "README.md",
  "SOLUTION.md",
  "PROJECT_WRITEUP.md",
  "PITCH_DECK.md",
  "assets/architecture.svg",
];

const missing = requiredFiles.filter((file) => !existsSync(file));
if (missing.length) {
  throw new Error(`Missing required files: ${missing.join(", ")}`);
}

const html = readFileSync("index.html", "utf8");
const requiredText = [
  "Kisan Alert",
  "End-to-end web form",
  "Generate advisory",
  "A complete field-to-RSK operating system",
  "Google Cloud deployable architecture",
  "From prototype to one-district pilot",
  "All demo actions stay on this page",
];

for (const text of requiredText) {
  if (!html.includes(text)) {
    throw new Error(`index.html does not include required text: ${text}`);
  }
}

console.log("Static site validation passed.");
