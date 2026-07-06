import { routeEvent } from "./integrations/event-bus.mjs";

export function handlePubSubMessage(message) {
  const event = typeof message === "string" ? JSON.parse(message) : message;
  return {
    eventId: event.id,
    type: event.type,
    routes: routeEvent(event),
    ack: true,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const sample = { id: "sample", type: "rsk.ticket.created", payload: { village: "Kothapalli" } };
  console.log(JSON.stringify(handlePubSubMessage(sample), null, 2));
}
