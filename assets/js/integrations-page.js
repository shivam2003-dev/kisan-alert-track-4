import { integrationContracts, pretty } from "./integration-contracts.js";

document.querySelector("#ivrContract").textContent = pretty(integrationContracts.ivr);
document.querySelector("#languageContract").textContent = pretty(integrationContracts.language);
document.querySelector("#satelliteContract").textContent = pretty(integrationContracts.satellite);
document.querySelector("#eventContract").textContent = pretty(integrationContracts.event);
