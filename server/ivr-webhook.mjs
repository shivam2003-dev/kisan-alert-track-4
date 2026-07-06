import http from "node:http";
import { createRskTicket, generateAdvisory } from "../assets/js/advisory-engine.js";
import { buildEvent, routeEvent } from "./integrations/event-bus.mjs";
import { buildVoiceResponse, extractSlots } from "./integrations/language-adapter.mjs";
import { computeDrynessSeverity, getSatelliteFeatures } from "./integrations/satellite-adapter.mjs";

const port = Number(process.env.PORT || 8790);

const server = http.createServer(async (req, res) => {
  if (req.method !== "POST" || req.url !== "/webhooks/ivr") {
    return json(res, 404, { error: "not_found" });
  }

  const body = JSON.parse((await readBody(req)) || "{}");
  const slots = extractSlots(body);
  const features = getSatelliteFeatures({ village: body.village });
  const drynessSeverity = computeDrynessSeverity(features);
  const advisory = generateAdvisory({ ...body, voiceNote: slots.normalizedTranscript });
  const ticket = slots.symptom !== "none" || advisory.rsk.confidence < 50 ? createRskTicket({ ...body, voiceNote: slots.normalizedTranscript }) : null;
  const event = buildEvent(ticket ? "rsk.ticket.created" : "advisory.generated", { advisory, ticket, features, drynessSeverity });

  return json(res, 200, {
    say: buildVoiceResponse(advisory, body.language),
    sms: advisory.sms,
    ticket,
    event,
    routes: routeEvent(event),
  });
});

server.listen(port, () => {
  console.log(`IVR webhook listening on http://localhost:${port}/webhooks/ivr`);
});

function json(res, status, payload) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}
