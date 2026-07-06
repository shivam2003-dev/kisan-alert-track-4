export const pilotConfig = {
  district: "Anantapuramu dryland pilot",
  farmers: 500,
  rskCenters: ["Kothapalli RSK", "Ramapuram RSK", "Chennapuram RSK"],
  crops: ["Red gram", "Maize"],
  fpoPartners: ["Sri Satya Sai Dryland FPO", "Anantapur Farmer Producer Collective"],
  consentChecklist: [
    "Voice consent before storing phone number and village",
    "Photo consent before RSK crop-health review",
    "No sale of farmer-level data",
    "Raw voice/photo deleted after 30 days unless ticket is active",
    "Advisory is explanatory and RSK can override model output",
  ],
  trainingModules: [
    "RSK dashboard triage",
    "Confidence-gated AI review",
    "Dry-spell and crop-stage water logic",
    "Voice callback closure",
    "Escalation to KVK/agronomist",
  ],
  escalation: "If 5 similar low-confidence tickets appear within 5 km in 48 hours, notify district agriculture officer and draft cluster advisory.",
};
