# KisanVaani Solution

## Summary

KisanVaani is a voice-and-SMS agricultural intelligence platform for small and marginal farmers. It combines soil cards, rainfall outlooks, groundwater depth, satellite crop signals, mandi price trends, crop-stage water needs, and Rythu Seva Kendra expert follow-up into plot-specific advice in the farmer's language.

The platform is designed for feature phones, low literacy, dialect speech, and trust through local experts. Farmers ask by missed call, IVR, SMS, WhatsApp voice, or an RSK-assisted kiosk; KisanVaani answers with a concrete action and rupee impact.

## Submission Form Answers

### Explain Your Solution

KisanVaani helps farmers decide what to sow, when to irrigate, when to wait, and when to escalate crop-health problems to experts. A farmer calls or sends a voice note. The system identifies the farmer and plot, assembles Soil Health Card data, soil grids, groundwater, satellite vegetation signals, block weather forecast, crop stage, and mandi prices. It recommends a risk-balanced crop portfolio, triggers dry-spell alerts based on crop-stage water need, and diagnoses crop-health photos with confidence gating. Routine cases receive instant voice/SMS advice. Uncertain cases become RSK tickets with photo, plot, crop history, and location attached. Expert replies return to the farmer by voice and become training data for future triage.

### Technologies Used

The prototype is a static multi-page product deployed on GCP/GKE behind Argo CD. The pilot architecture uses FastAPI/Python services, PostgreSQL/PostGIS, Google Earth Engine or Sentinel Hub, Sentinel-1/2 vegetation and moisture features, Soil Health Card and SoilGrids data, CGWB groundwater, IMD block forecasts, Agmarknet prices, Bhashini/AI4Bharat or Sarvam-ready Indic ASR/TTS, crop-stage advisory logic, confidence-gated image classification, and RSK expert workflow tools. The live deployment uses Docker/Nginx, Artifact Registry, GKE, Argo CD, Certificate Manager, and Vercel DNS.

### Presentation Upload

Use the KisanVaani Track 4 pitch deck. This file provides the written submission copy and technical evaluation mapping.

## Problem

Small farmers often choose crops, sowing dates, irrigation timing, and pest responses using habit, dealer advice, or village hearsay. The data needed to improve those decisions already exists, but it rarely reaches the farmer in a timely, local, plot-specific, and trustworthy form.

KisanVaani addresses:

- Monsoon and dry-spell uncertainty.
- Groundwater-blind crop choice.
- Soil Health Card data that is hard to interpret.
- Late pest and disease escalation.
- Generic district advisories that do not fit the farmer's plot.
- Smartphone and literacy barriers.

## Core User Flow

1. A farmer gives a missed call or sends a WhatsApp voice note.
2. The system recognizes the farmer, language, and mapped plot.
3. Plot context is assembled from soil, groundwater, satellite, weather, and price data.
4. The crop portfolio engine recommends safe, market, and high-return crop options.
5. The dry-spell engine checks rainfall deficit against the crop's current water need.
6. Advice is spoken back and sent by SMS with rupee impact.
7. A crop-health photo is classified with confidence gating.
8. Low-confidence cases become RSK expert tickets.
9. Expert voice replies return to the farmer and update district pest intelligence.

## Main Features

- **Voice-first access**: missed call, IVR, WhatsApp voice, SMS fallback, and RSK-assisted entry.
- **Crop portfolio engine**: risk-balanced crop recommendations, not one-size-fits-all advice.
- **Dry-spell alerts**: stage-aware water alerts tied to crop need and rupee impact.
- **Satellite evidence**: Sentinel/NDVI/SAR signals for crop stress and field context.
- **Crop doctor**: photo and symptom triage with honest confidence thresholds.
- **RSK expert loop**: hard cases routed to local officers with context attached.
- **District pest map**: expert-validated cases become early-warning signals.

## AI And Data Pipeline

KisanVaani uses AI and data science where it makes advice personal, explainable, and safe:

- Indic ASR/TTS makes advice available to low-literacy and feature-phone users.
- Translation and intent parsing turn dialect speech into structured crop questions.
- Satellite processing tracks vegetation and water stress at plot level.
- Optimization recommends crop mixes by yield, price, input cost, groundwater draw, and risk.
- Crop-stage water balance defines dry spells by need, not just by days without rain.
- Vision models triage crop-health photos and escalate uncertain cases to RSK experts.
- Expert corrections become ground truth for better future triage.

## Tools And Technology Fit

| Area | Tools | How KisanVaani uses them |
| --- | --- | --- |
| Voice and language | Bhashini, AI4Bharat, Sarvam, IVR/TTS | Understands farmer speech and replies in local language. |
| Plot context | Soil Health Card, SoilGrids, CGWB, IMD, Agmarknet | Grounds advice in soil, water, weather, and market reality. |
| Satellite data | Sentinel-1 SAR, Sentinel-2 NDVI, Earth Engine | Detects crop stress and works during cloudy monsoon periods. |
| AI diagnosis | Crop-health classifiers, confidence gating | Handles routine cases and escalates uncertain ones to experts. |
| Expert workflow | RSK queue, voice reply, ticket state | Keeps humans in the loop for trust and difficult cases. |
| Deployment | Docker, GKE, Argo CD, Artifact Registry, Certificate Manager | Runs the live demo and supports merge-to-deploy automation. |

## Evaluation Criteria Mapping

| Evaluation parameter | KisanVaani fit |
| --- | --- |
| Problem-Solution Fit | Solves the gap between available agri data and farmer-level action. |
| AI/Technical Execution | AI powers speech, plot context, crop portfolio, dry-spell logic, and crop-health triage. |
| Deployability and Scalability | Starts through RSKs and phone channels; scales mandal by mandal. |
| Inclusivity and Accessibility | Works on missed calls, IVR, SMS, and local language voice. |
| Impact Potential | Can reduce failed sowing, wasted irrigation, late pest response, and avoidable input loss. |
| Presentation and Clarity | Demo follows one farmer from voice question to satellite-grounded advice and RSK escalation. |

## Deployment

Current live entry points:

- KisanVaani primary: `https://kissanvani.shivam2003.com/`
- KisanVaani alias: `https://kisanvani.shivam2003.com/`

Production path:

- GitHub `main` push triggers CI/CD.
- GitHub Actions validates the app and builds a Docker image.
- The image is pushed to Artifact Registry.
- The workflow commits the image tag into `deploy/k8s/deployment.yaml`.
- Argo CD syncs the `kisanvani-gcp` app into the shared LokSetu GKE cluster.

## Evaluation Path

1. Open the KisanVaani farmer page.
2. Generate a plot-specific advisory.
3. Review the crop portfolio and dry-spell warning.
4. Attach a crop-health photo.
5. Watch uncertain diagnosis become an RSK ticket.
6. Close the ticket by expert voice reply.
7. Inspect district, RSK, evidence, integrations, and pilot-readiness pages.

## Why It Matters

KisanVaani makes satellites, soil cards, weather models, market data, and local experts speak the farmer's language. It turns complex data into a short, trusted, plot-specific action before a season is lost.
