export function buildEvent(type, payload) {
  return {
    type,
    id: `${type}-${Date.now()}`,
    source: "kisan-alert",
    createdAt: new Date().toISOString(),
    payload,
  };
}

export function routeEvent(event) {
  const routes = {
    "advisory.generated": ["sms", "audit_log"],
    "rsk.ticket.created": ["rsk_queue", "district_heatmap", "audit_log"],
    "rsk.ticket.closed": ["sms", "training_labels", "audit_log"],
    "district.alert.broadcast": ["sms_broadcast", "officer_dashboard", "audit_log"],
  };
  return routes[event.type] || ["audit_log"];
}
