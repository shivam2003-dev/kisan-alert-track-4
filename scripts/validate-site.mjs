import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "farmer.html",
  "rsk.html",
  "district.html",
  "integrations.html",
  "pilot.html",
  "implementation.html",
  "styles.css",
  "app.js",
  "PHASE.md",
  "README.md",
  "SOLUTION.md",
  "PROJECT_WRITEUP.md",
  "PITCH_DECK.md",
  "assets/architecture.svg",
  "assets/js/advisory-engine.js",
  "assets/js/ai-client.js",
  "assets/js/rsk-page.js",
  "assets/js/district-page.js",
  "assets/js/integration-contracts.js",
  "assets/js/integrations-page.js",
  "assets/js/pilot-config.js",
  "assets/js/pilot-page.js",
  "server/ai-proxy.mjs",
  "server/ivr-webhook.mjs",
  "server/pubsub-worker.mjs",
  "server/schema.sql",
  "server/integrations/language-adapter.mjs",
  "server/integrations/satellite-adapter.mjs",
  "server/integrations/event-bus.mjs",
  "data/pilot-config.json",
  ".env.example",
];

const missing = requiredFiles.filter((file) => !existsSync(file));
if (missing.length) {
  throw new Error(`Missing required files: ${missing.join(", ")}`);
}

const pages = ["index.html", "farmer.html", "rsk.html", "district.html", "integrations.html", "pilot.html", "implementation.html"];
const pageHtml = Object.fromEntries(pages.map((page) => [page, readFileSync(page, "utf8")]));
const requiredText = {
  "index.html": ["Kisan Alert", "A complete field-to-RSK operating system", "All demo actions stay on this page"],
  "farmer.html": ["Farmer advisory", "Generate advisory", "Attach crop-health photo"],
  "rsk.html": ["RSK expert queue", "Resolve first ticket"],
  "district.html": ["District Intelligence", "Village risk"],
  "integrations.html": ["Integration Console", "Production adapters without exposing secrets", "IVR webhook"],
  "pilot.html": ["Pilot Readiness", "Ready for a one-district RSK pilot", "Consent and data"],
  "implementation.html": ["All phases are implemented here", "Phase 1", "Phase 4"],
};

for (const [page, texts] of Object.entries(requiredText)) {
  for (const text of texts) {
    if (!pageHtml[page].includes(text)) {
      throw new Error(`${page} does not include required text: ${text}`);
    }
  }
}

for (const [page, html] of Object.entries(pageHtml)) {
  if (/href=["']https?:/i.test(html)) {
    throw new Error(`${page} contains an external href`);
  }
  if (/github\.com/i.test(html)) {
    throw new Error(`${page} contains public GitHub wording`);
  }
}

console.log("Static site validation passed.");
