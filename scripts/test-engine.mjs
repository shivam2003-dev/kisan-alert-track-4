import assert from "node:assert/strict";
import { calculateScores, createRskTicket, districtSummary, generateAdvisory } from "../assets/js/advisory-engine.js";
import { integrationContracts } from "../assets/js/integration-contracts.js";
import { pilotConfig } from "../assets/js/pilot-config.js";
import { buildEvent, routeEvent } from "../server/integrations/event-bus.mjs";
import { computeDrynessSeverity, getSatelliteFeatures } from "../server/integrations/satellite-adapter.mjs";
import { buildVoiceResponse, extractSlots } from "../server/integrations/language-adapter.mjs";
import { handlePubSubMessage } from "../server/pubsub-worker.mjs";

const dryland = { name: "Raju", village: "Kothapalli", acres: 2, nitrogen: "low", ph: 7.8, groundwater: "deep", stage: "sowing", voiceNote: "Aaku pasupu" };
const irrigated = { name: "Sita", village: "Ramapuram", acres: 2, nitrogen: "high", ph: 7.1, groundwater: "shallow", stage: "vegetative", voiceNote: "Which crop?" };

const dryScores = calculateScores(dryland);
assert.ok(dryScores.redGram > dryScores.paddy, "red gram should outrank paddy under deep groundwater");

const irrigatedScores = calculateScores(irrigated);
assert.ok(irrigatedScores.paddy > dryScores.paddy, "paddy score should improve with available groundwater");

const advisory = generateAdvisory(dryland);
assert.match(advisory.sms, /Avoid paddy/);
assert.match(advisory.drySpell, /10 mm rain/);

const ticket = createRskTicket(dryland);
assert.equal(ticket.confidence, 39);
assert.match(ticket.summary, /SAR wetness/);

assert.equal(districtSummary().length, 3);

assert.equal(integrationContracts.ivr.endpoint, "/webhooks/ivr");
assert.ok(pilotConfig.farmers >= 500);

const slots = extractSlots({ transcript: "Aaku pasupu kanipistundi", village: "Kothapalli" });
assert.equal(slots.symptom, "yellow_leaf");

const features = getSatelliteFeatures({ village: "Chennapuram" });
assert.ok(computeDrynessSeverity(features) >= 75);

const event = buildEvent("rsk.ticket.created", { village: "Kothapalli" });
assert.ok(routeEvent(event).includes("rsk_queue"));
assert.equal(handlePubSubMessage(event).ack, true);
assert.match(buildVoiceResponse(advisory, "te-IN"), /Namaskaram/);

console.log("Advisory engine tests passed.");
