export function extractSlots({ transcript = "", village = "Kothapalli", language = "te-IN" }) {
  const lower = transcript.toLowerCase();
  return {
    language,
    village,
    cropIntent: lower.includes("panta") || lower.includes("crop") || lower.includes("sow"),
    symptom: lower.includes("aaku") || lower.includes("leaf") ? "yellow_leaf" : "none",
    urgency: lower.includes("flower") || lower.includes("pasupu") ? "review" : "normal",
    normalizedTranscript: transcript.trim(),
  };
}

export function buildVoiceResponse(advisory, language = "te-IN") {
  if (language.startsWith("te")) {
    return `Namaskaram. ${advisory.recommendation} SMS pampistunnam.`;
  }
  return `Namaste. ${advisory.recommendation} We are sending the SMS summary.`;
}
