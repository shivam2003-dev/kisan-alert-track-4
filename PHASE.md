# KisanVaani Phase Plan

## Current Objective

Build the selected hackathon solution into a credible end-to-end pilot package inside this repository: multi-page web product, field advisory form, RSK expert workflow, district intelligence, AI-ready backend pattern, tests and CI/CD deployment.

## Phase 0 - Research And Differentiation

Status: implemented.

Scope:

- Research notes in `RESEARCH.md`.
- Evidence page in `evidence.html`.
- Global playbook page in `global.html`.
- Remote sensing rationale for Sentinel-1 SAR plus Sentinel-2 NDVI/NDWI.
- FAO-56 style crop-stage water requirement framing.
- Agromet advisory adoption and trust rationale.
- Conservative AI diagnosis claims with RSK escalation.

Acceptance checks:

- Evidence page is reachable through local navigation.
- Public page has no external research redirects.
- Research claims are mapped to clickable product features.
- Global country lessons are translated into concrete KisanVaani features.

## Phase 1 - Farmer Advisory Product

Status: implemented.

Scope:

- Multi-page navigation with farmer, RSK, district and implementation surfaces.
- Farmer web form for name, phone, village, acres, soil nitrogen, pH, groundwater, crop stage and voice note.
- Shared crop portfolio engine for red gram, maize and paddy.
- Dry-spell advisory tied to village rainfall/wetness risk.
- SMS fallback generated on the page.
- Crop-health photo action creates a confidence-gated RSK ticket.
- Static validation and engine tests in CI.

Acceptance checks:

- `npm test` passes.
- Farmer page generates advisory without leaving the page.
- No API key is committed.
- Public UI does not redirect to repository or docs.

## Phase 2 - RSK And District Intelligence

Status: implemented.

Scope:

- RSK dashboard for low-confidence tickets.
- Expert resolution action that returns voice/SMS-style closure.
- District page with village dry-spell and crop-stress signals.
- District broadcast advisory copy.
- Shared `advisory-engine.js` used by all pages and tests.
- Optional AI proxy scaffold using `OPENROUTER_API_KEY` from environment.
- Optional browser AI enrichment through `localStorage.kisanAiProxyUrl`; the frontend never stores the model token.

Acceptance checks:

- RSK page renders ticket queue.
- District page renders village signals.
- Advisory engine tests cover dryland and irrigated scenarios.
- AI token is never exposed in frontend JavaScript.

## Phase 3 - Real Integrations

Status: implemented.

Scope:

- Exotel/Twilio-style IVR webhook in `server/ivr-webhook.mjs`.
- Bhashini or AI4Bharat slot and voice-response adapter in `server/integrations/language-adapter.mjs`.
- Google Earth Engine/Sentinel feature contract in `server/integrations/satellite-adapter.mjs`.
- Cloud SQL/PostGIS schema in `server/schema.sql`.
- Pub/Sub-style event contracts in `server/integrations/event-bus.mjs` and `server/pubsub-worker.mjs`.
- Integration console in `integrations.html`.
- Server-side AI proxy pattern in `server/ai-proxy.mjs`.

Acceptance checks:

- Integration console renders IVR, language, satellite and event contracts.
- Webhook response returns voice text, SMS and event routes.
- Event bus routes advisory, ticket and broadcast events.
- No token is exposed in frontend code.

## Phase 4 - Pilot Readiness

Status: implemented.

Scope:

- FPO onboarding scope in `data/pilot-config.json`.
- Pilot readiness page in `pilot.html`.
- RSK training modules in `assets/js/pilot-config.js`.
- Farmer consent and data retention checklist in the pilot page.
- District monitoring targets: delivery rate, RSK closure time, false-alert rate and seed-risk savings.
- Escalation rule for 5 similar low-confidence tickets within 5 km in 48 hours.

Acceptance checks:

- Pilot page renders scope, consent, training and monitoring sections.
- Pilot configuration contains district, RSKs, crops, languages and target metrics.
- Static validation covers all public pages.

## Phase 5 - Guided Demo Experience

Status: implemented.

Scope:

- Reusable guided tour module in `assets/js/tour.js`.
- First-visit tour opens automatically and can be restarted with `Start tour`.
- Page-specific steps for farmer, RSK, district, integrations, evidence, pilot and implementation views.
- Highlighted target elements with next, back and skip controls.
- Tour tests in `scripts/test-tour.mjs`.

Acceptance checks:

- Every public page loads the guided tour.
- Tour has at least three steps per page.
- `npm test` validates static pages, engine logic and tour wiring.
