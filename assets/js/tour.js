export const tourSteps = {
  "index.html": [
    {
      selector: ".topbar",
      title: "Start anywhere",
      body: "Use these local tabs to move through the farmer, RSK, district, integration, pilot and phase views without leaving the site.",
    },
    {
      selector: ".hero-actions",
      title: "Two demo entry points",
      body: "Open the farmer form for the field workflow, or jump to the RSK queue to show human-in-the-loop follow-up.",
    },
    {
      selector: "#system",
      title: "Differentiated system",
      body: "The product is voice-first, plot-specific and RSK-backed, so it is not another generic crop app or chatbot.",
    },
    {
      selector: "#advisory-form",
      title: "Farmer intake",
      body: "This form simulates missed-call, IVR, SMS and WhatsApp voice channels for farmers who may not own smartphones.",
    },
    {
      selector: ".map-panel",
      title: "Satellite evidence",
      body: "The visual layer demonstrates monsoon-safe Sentinel-1 wetness plus Sentinel-2 crop vigor evidence.",
    },
    {
      selector: "#rsk",
      title: "RSK closure",
      body: "Low-confidence crop-health cases become expert tickets instead of pretending AI is always certain.",
    },
    {
      selector: "#deployment",
      title: "Submission package",
      body: "The implementation, CI/CD path and pilot package are all available inside the web experience.",
    },
  ],
  "farmer.html": [
    {
      selector: "#advisory-form",
      title: "Voice-first farmer form",
      body: "Treat this as the operator view behind IVR: one plot, one call, one actionable advisory.",
    },
    {
      selector: "#farmerForm",
      title: "Change the plot",
      body: "Try village, groundwater, pH and crop-stage values. The recommendation changes without any redirect.",
    },
    {
      selector: "#engine",
      title: "Crop risk portfolio",
      body: "The engine ranks safe, balanced and avoid options instead of giving one brittle crop answer.",
    },
    {
      selector: ".alert-engine",
      title: "Dry-spell economics",
      body: "Alerts are tied to crop stage and rupee risk so farmers get a decision, not only a weather fact.",
    },
    {
      selector: "#rsk",
      title: "Escalate uncertain cases",
      body: "Attach crop-health evidence to create a confidence-gated RSK ticket with context already attached.",
    },
  ],
  "rsk.html": [
    {
      selector: "#rskTicketList",
      title: "Expert queue",
      body: "RSK staff see the cases AI should not answer alone, prioritized by risk and clustering.",
    },
    {
      selector: "#expertAction",
      title: "Voice closure",
      body: "The expert response becomes callback-ready voice and SMS text for the farmer.",
    },
    {
      selector: "#resolveFirst",
      title: "Close the first ticket",
      body: "Click here during the demo to show the loop from farmer report to expert-approved advice.",
    },
    {
      selector: ".prototype-grid article:nth-child(4)",
      title: "Early warning byproduct",
      body: "Nearby low-confidence tickets produce district pest and stress signals automatically.",
    },
  ],
  "district.html": [
    {
      selector: "#districtCanvas",
      title: "Village risk board",
      body: "District officers see village stress from rainfall anomaly, satellite wetness and farmer tickets.",
    },
    {
      selector: "#districtSignals",
      title: "Prioritized villages",
      body: "The board ranks where extension staff should act first instead of showing raw charts only.",
    },
    {
      selector: "#broadcastCopy",
      title: "Preventive advisory",
      body: "The system turns district risk into a broadcast-ready message for IVR and SMS.",
    },
    {
      selector: ".stats",
      title: "Impact framing",
      body: "Judges can see farmer count, seed-risk savings and RSK operating scope in one place.",
    },
  ],
  "integrations.html": [
    {
      selector: "#ivrContract",
      title: "IVR contract",
      body: "The webhook shape is ready for Exotel or Twilio missed-call and IVR callbacks.",
    },
    {
      selector: "#languageContract",
      title: "Indic language adapter",
      body: "Bhashini or AI4Bharat handles ASR, translation and TTS while the app keeps approved advisory templates.",
    },
    {
      selector: "#satelliteContract",
      title: "Satellite feature contract",
      body: "Earth Engine features can feed Sentinel-1 wetness, Sentinel-2 NDVI/NDWI and rainfall anomaly into scoring.",
    },
    {
      selector: "#eventContract",
      title: "Evented operations",
      body: "Advisories, tickets and broadcasts move through decoupled events so the system can scale district by district.",
    },
  ],
  "pilot.html": [
    {
      selector: "#pilotScope",
      title: "Pilot scope",
      body: "The demo is framed as a realistic one-district pilot: 500 farmers, 3 RSKs and 2 crops.",
    },
    {
      selector: "#consentChecklist",
      title: "Consent and data",
      body: "Consent, retention and opt-out are explicit because this is a rural public-service workflow.",
    },
    {
      selector: "#trainingModules",
      title: "RSK training",
      body: "Operational success depends on RSK staff knowing how to triage, correct and close cases.",
    },
    {
      selector: "#pilotEscalation",
      title: "Escalation rule",
      body: "Repeated similar low-confidence reports trigger district attention before damage spreads.",
    },
  ],
  "implementation.html": [
    {
      selector: ".hero",
      title: "Full phase view",
      body: "This page summarizes how the hackathon build becomes a deployable pilot package.",
    },
    {
      selector: ".implementation-grid article:nth-child(1)",
      title: "Phase 1",
      body: "Farmer advisory, crop portfolio, dry-spell alert and SMS fallback are implemented.",
    },
    {
      selector: ".implementation-grid article:nth-child(2)",
      title: "Phase 2",
      body: "RSK workflow and district intelligence turn uncertain AI output into expert action.",
    },
    {
      selector: ".implementation-grid article:nth-child(3)",
      title: "Phase 3",
      body: "Integration scaffolds cover IVR, language, satellite, database, events and server-side AI.",
    },
    {
      selector: ".implementation-grid article:nth-child(4)",
      title: "Phase 4",
      body: "Pilot readiness covers FPO onboarding, consent, training, monitoring and escalation.",
    },
  ],
  "evidence.html": [
    {
      selector: "#research-principles",
      title: "Research-backed design",
      body: "These principles explain why the solution uses remote sensing, crop-stage water logic and human validation.",
    },
    {
      selector: "#evidence-stack",
      title: "Evidence stack",
      body: "Each technical layer maps to a field problem: monsoon clouds, irrigation timing, trust, language and escalation.",
    },
    {
      selector: "#research-to-product",
      title: "Research to product",
      body: "This table converts papers and public systems into features judges can click and test.",
    },
    {
      selector: "#field-risks",
      title: "Honest limits",
      body: "The app names model limits and gives the RSK escalation path instead of overclaiming field-photo accuracy.",
    },
  ],
};

export function resolvePageKey(pathname = window.location.pathname) {
  const clean = pathname.split("?")[0].split("#")[0];
  const name = clean.substring(clean.lastIndexOf("/") + 1);
  return name || "index.html";
}

function storageKey(pageKey) {
  return `kisan-tour-done:${pageKey}`;
}

function createButton(className, text) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = text;
  return button;
}

function getVisibleSteps(pageKey) {
  return (tourSteps[pageKey] || tourSteps["index.html"]).filter((step) => document.querySelector(step.selector));
}

function positionCard(card, target) {
  const rect = target.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const gap = 14;
  const roomBelow = window.innerHeight - rect.bottom;
  const top = roomBelow > cardRect.height + gap ? rect.bottom + gap : Math.max(16, rect.top - cardRect.height - gap);
  const left = Math.min(
    Math.max(16, rect.left),
    Math.max(16, window.innerWidth - cardRect.width - 16),
  );

  card.style.top = `${top}px`;
  card.style.left = `${left}px`;
}

export function initTour() {
  const pageKey = resolvePageKey();
  const steps = getVisibleSteps(pageKey);
  if (!steps.length || document.querySelector("[data-tour-root]")) return;

  let activeIndex = 0;
  let activeTarget = null;

  const launcher = createButton("tour-launcher", "Start tour");
  launcher.setAttribute("aria-label", "Start guided tour");
  document.body.appendChild(launcher);

  const root = document.createElement("div");
  root.dataset.tourRoot = "true";
  root.className = "tour-root";
  root.hidden = true;
  root.innerHTML = `
    <div class="tour-scrim" aria-hidden="true"></div>
    <section class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tourTitle">
      <div class="tour-progress" aria-live="polite"></div>
      <h2 id="tourTitle"></h2>
      <p id="tourBody"></p>
      <div class="tour-actions">
        <button class="button secondary tour-back" type="button">Back</button>
        <button class="button secondary tour-skip" type="button">Skip</button>
        <button class="button primary tour-next" type="button">Next</button>
      </div>
    </section>
  `;
  document.body.appendChild(root);

  const card = root.querySelector(".tour-card");
  const progress = root.querySelector(".tour-progress");
  const title = root.querySelector("#tourTitle");
  const body = root.querySelector("#tourBody");
  const back = root.querySelector(".tour-back");
  const skip = root.querySelector(".tour-skip");
  const next = root.querySelector(".tour-next");

  function clearHighlight() {
    if (activeTarget) {
      activeTarget.classList.remove("tour-highlight");
      activeTarget = null;
    }
  }

  function closeTour(markDone = true) {
    clearHighlight();
    root.hidden = true;
    document.body.classList.remove("tour-open");
    if (markDone) localStorage.setItem(storageKey(pageKey), "true");
    launcher.focus();
  }

  function renderStep() {
    clearHighlight();
    const step = steps[activeIndex];
    const target = document.querySelector(step.selector);
    if (!target) return;

    activeTarget = target;
    activeTarget.classList.add("tour-highlight");
    activeTarget.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

    progress.textContent = `Step ${activeIndex + 1} of ${steps.length}`;
    title.textContent = step.title;
    body.textContent = step.body;
    back.disabled = activeIndex === 0;
    next.textContent = activeIndex === steps.length - 1 ? "Done" : "Next";

    requestAnimationFrame(() => positionCard(card, target));
  }

  function openTour() {
    activeIndex = 0;
    root.hidden = false;
    document.body.classList.add("tour-open");
    renderStep();
    next.focus();
  }

  launcher.addEventListener("click", openTour);
  back.addEventListener("click", () => {
    if (activeIndex > 0) {
      activeIndex -= 1;
      renderStep();
    }
  });
  next.addEventListener("click", () => {
    if (activeIndex === steps.length - 1) {
      closeTour(true);
      return;
    }
    activeIndex += 1;
    renderStep();
  });
  skip.addEventListener("click", () => closeTour(true));
  root.querySelector(".tour-scrim").addEventListener("click", () => closeTour(false));
  window.addEventListener("resize", () => {
    if (!root.hidden && activeTarget) positionCard(card, activeTarget);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !root.hidden) closeTour(false);
  });

  if (localStorage.getItem(storageKey(pageKey)) !== "true") {
    window.setTimeout(openTour, 650);
  }
}

if (typeof document !== "undefined") {
  initTour();
}
