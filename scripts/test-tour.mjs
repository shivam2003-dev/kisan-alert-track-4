import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolvePageKey, tourSteps } from "../assets/js/tour.js";

const pages = [
  "index.html",
  "farmer.html",
  "rsk.html",
  "district.html",
  "integrations.html",
  "evidence.html",
  "pilot.html",
  "implementation.html",
];

assert.equal(resolvePageKey("/"), "index.html");
assert.equal(resolvePageKey("/kisan-alert-track-4/"), "index.html");
assert.equal(resolvePageKey("/kisan-alert-track-4/farmer.html"), "farmer.html");

for (const page of pages) {
  assert.ok(tourSteps[page], `${page} has tour steps`);
  assert.ok(tourSteps[page].length >= 3, `${page} has at least three tour steps`);

  const html = readFileSync(page, "utf8");
  assert.ok(html.includes("assets/js/tour.js"), `${page} loads guided tour module`);
}

console.log("Guided tour tests passed.");
