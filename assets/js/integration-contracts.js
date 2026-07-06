export const integrationContracts = {
  ivr: {
    endpoint: "/webhooks/ivr",
    method: "POST",
    provider: "Exotel or Twilio",
    request: {
      caller: "+919000012345",
      language: "te-IN",
      village: "Kothapalli",
      transcript: "Ee varsham lo ye pantalu veyali?",
      stage: "sowing",
    },
    response: {
      say: "Avoid paddy this week. Sow red gram after next effective rain.",
      sms: "Kothapalli: Avoid paddy. Red gram first; maize only after 10 mm rain.",
      ticketRequired: false,
    },
  },
  language: {
    asrProvider: "Bhashini primary, AI4Bharat fallback",
    slots: ["village", "crop", "stage", "symptom", "urgency"],
    ttsLanguages: ["te-IN", "hi-IN"],
    dialectDictionary: ["neellu levu", "varsham ledu", "aaku pasupu", "mandhu emi"],
  },
  satellite: {
    source: "Google Earth Engine",
    features: ["sentinel1_vv_wetness", "sentinel2_ndvi", "sentinel2_ndwi", "chirps_30d_anomaly"],
    cadence: "daily village refresh, weekly plot refresh",
    fallback: "village centroid when plot boundary is unavailable",
  },
  event: {
    topics: ["advisory.generated", "rsk.ticket.created", "rsk.ticket.closed", "district.alert.broadcast"],
    storage: "Cloud SQL/PostGIS",
    retention: "raw voice/photo 30 days, derived advisory records 24 months",
  },
};

export function pretty(value) {
  return JSON.stringify(value, null, 2);
}
