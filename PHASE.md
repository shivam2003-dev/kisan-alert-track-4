# Kisan Alert Phase Plan

## Current Objective

Build the selected hackathon solution into a credible end-to-end pilot package inside this repository: multi-page web product, field advisory form, RSK expert workflow, district intelligence, AI-ready backend pattern, tests and CI/CD deployment.

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

Status: next.

Scope:

- Exotel/Twilio IVR webhook.
- Bhashini or AI4Bharat ASR/TTS.
- Google Earth Engine Sentinel-1/Sentinel-2 feature generation.
- Cloud SQL/PostGIS for farmers, plots and tickets.
- Pub/Sub for alerts and RSK ticket events.
- RSK authentication and role-based dashboard.

## Phase 4 - Pilot Readiness

Status: next.

Scope:

- FPO onboarding.
- RSK training flow.
- Farmer consent and data retention rules.
- District monitoring dashboard.
- Agronomist review of crop-stage rules and alert thresholds.
- Pilot metrics: seed-risk savings, advisory delivery rate, RSK closure time and false-alert rate.
