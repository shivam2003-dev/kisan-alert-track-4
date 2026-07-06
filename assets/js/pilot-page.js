import { pilotConfig } from "./pilot-config.js";

document.querySelector("#pilotScope").innerHTML = [
  `District: ${pilotConfig.district}`,
  `Farmers: ${pilotConfig.farmers}`,
  `RSKs: ${pilotConfig.rskCenters.join(", ")}`,
  `Crops: ${pilotConfig.crops.join(", ")}`,
  `FPOs: ${pilotConfig.fpoPartners.join(", ")}`,
]
  .map((item) => `<article class="ticket"><span>Scope</span><strong>${item}</strong></article>`)
  .join("");

document.querySelector("#consentChecklist").innerHTML = pilotConfig.consentChecklist
  .map((item) => `<label><input type="checkbox" checked /> ${item}</label>`)
  .join("");

document.querySelector("#trainingModules").innerHTML = pilotConfig.trainingModules
  .map((item, index) => `<article class="ticket"><span>Module ${index + 1}</span><strong>${item}</strong><p>Trainer: district agri team + RSK lead.</p></article>`)
  .join("");

document.querySelector("#pilotEscalation").textContent = pilotConfig.escalation;
