# Kisan Alert

Voice-first crop, water, dry-spell and RSK advisory prototype for Code for Communities Track 4.

Live site: https://shivam2003-dev.github.io/kisan-alert-track-4/

## What Is Included

- Working static prototype: `index.html`, `styles.css`, `app.js`
- Full solution blueprint: `SOLUTION.md`
- Project write-up: `PROJECT_WRITEUP.md`
- Pitch deck outline: `PITCH_DECK.md`
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

1. Click `Call back farmer`.
2. Watch Telugu IVR intent extraction and plot-specific crop advice.
3. Review the satellite panel and crop portfolio score.
4. Click `Log yellow-leaf photo`.
5. Watch the low-confidence case become an RSK ticket.
6. Click `RSK closes ticket by voice`.

## Deployment

The site deploys through GitHub Actions:

```text
.github/workflows/pages.yml
```

Every push to `main` uploads the static site artifact and publishes it to GitHub Pages.

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
