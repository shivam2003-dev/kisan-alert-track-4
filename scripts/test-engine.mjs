import assert from "node:assert/strict";
import { calculateScores, createRskTicket, districtSummary, generateAdvisory } from "../assets/js/advisory-engine.js";

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

console.log("Advisory engine tests passed.");
