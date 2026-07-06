# Kisan Alert

Selected-project implementation package for a voice-first crop, water, dry-spell and RSK advisory system.

Live site: https://shivam2003-dev.github.io/kisan-alert-track-4/

## What Is Included

- Working static web-form prototype: `index.html`, `styles.css`, `app.js`
- Multi-page product: `farmer.html`, `rsk.html`, `district.html`, `implementation.html`
- Phase roadmap: `PHASE.md`
- Shared advisory engine: `assets/js/advisory-engine.js`
- Optional AI proxy scaffold: `server/ai-proxy.mjs`
- Full solution blueprint: `SOLUTION.md`
- Project write-up: `PROJECT_WRITEUP.md`
- Architecture diagram: `assets/architecture.svg`
- GitHub Actions Pages deployment: `.github/workflows/pages.yml`

## Run Locally

```bash
python3 -m http.server 4174
```

Then open:

```text
http://localhost:4174
```

## Demo Flow

1. Fill the farmer intake form.
2. Click `Generate advisory`.
3. Watch the IVR transcript, SMS fallback, crop scores and dry-spell advisory update on the same page.
4. Click `Attach crop-health photo`.
5. Watch the low-confidence case become an RSK ticket.
6. Click `RSK closes ticket by voice`.

## What The Live Site Shows

- Farmer access through a single web form that simulates missed call, IVR, SMS and WhatsApp voice.
- Crop portfolio recommendation using soil, rainfall, groundwater, satellite and price signals.
- Crop-stage dry-spell advisory with rupee impact.
- Low-confidence crop-health triage to RSK experts.
- One-district implementation plan and Google Cloud deployment architecture.
- No public UI action redirects to GitHub or Markdown files; all demo actions stay in the page.

## Deployment

The site deploys through GitHub Actions:

```text
.github/workflows/pages.yml
```

Every push to `main` uploads the static site artifact and publishes it to GitHub Pages.

## Optional AI Proxy

Do not put provider tokens in browser code. For local or Cloud Run use, set:

```bash
cp .env.example .env
export OPENROUTER_API_KEY="your_server_side_key"
node server/ai-proxy.mjs
```

The public static site keeps using deterministic agronomy logic if no backend is connected.

## Google Cloud Production Mapping

For a real district pilot:

- Cloud Run: agronomy and advisory APIs.
- API Gateway: IVR/SMS webhook entrypoint.
- Pub/Sub: alert fanout and RSK ticket events.
- Cloud SQL/PostGIS: farmers, plots, tickets and geospatial joins.
- Cloud Storage: photos, voice logs and satellite evidence.
- Earth Engine: Sentinel-1/Sentinel-2 plot signals.
- Vertex AI: diagnosis classifier and confidence gate.
- Cloud Monitoring: uptime, latency and alert delivery.
