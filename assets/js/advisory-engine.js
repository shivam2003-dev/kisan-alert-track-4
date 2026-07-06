export const villages = {
  Kothapalli: { rainfallAnomaly: -34, drySpellRisk: 78, sarWetness: "low", rsk: "Kothapalli RSK" },
  Ramapuram: { rainfallAnomaly: -22, drySpellRisk: 64, sarWetness: "moderate", rsk: "Ramapuram RSK" },
  Chennapuram: { rainfallAnomaly: -41, drySpellRisk: 84, sarWetness: "low", rsk: "Chennapuram RSK" },
};

export function normalizeFormData(raw) {
  return {
    name: raw.name || raw.farmerName || "Farmer",
    phone: raw.phone || "+91 90000 12345",
    village: raw.village || "Kothapalli",
    acres: Number(raw.acres || 2),
    nitrogen: raw.nitrogen || "low",
    ph: Number(raw.ph || 7.8),
    groundwater: raw.groundwater || "deep",
    stage: raw.stage || "sowing",
    voiceNote: raw.voiceNote || "",
  };
}

export function calculateScores(input) {
  const data = normalizeFormData(input);
  let redGram = 78;
  let maize = 70;
  let paddy = 58;

  if (data.groundwater === "deep") {
    redGram += 8;
    maize -= 1;
    paddy -= 22;
  }
  if (data.groundwater === "shallow") {
    paddy += 10;
    redGram -= 4;
  }
  if (data.nitrogen === "low") {
    redGram += 4;
    maize -= 4;
    paddy -= 5;
  }
  if (data.nitrogen === "high") {
    maize += 3;
    paddy += 2;
  }
  if (data.ph > 7.5) {
    redGram += 2;
    paddy -= 4;
  }
  if (data.stage === "flowering") {
    redGram += 1;
    maize -= 2;
  }

  return {
    redGram: clamp(redGram),
    maize: clamp(maize),
    paddy: clamp(paddy),
  };
}

export function generateAdvisory(input) {
  const data = normalizeFormData(input);
  const village = villages[data.village] || villages.Kothapalli;
  const scores = calculateScores(data);
  const saving = Math.round(1900 * Math.max(1, data.acres));
  const stageLabel = label(data.stage);
  const gwLabel = data.groundwater === "deep" ? "deep / risky" : data.groundwater;
  const safeArea = Math.max(0.25, Math.round(data.acres * 0.75 * 4) / 4);
  const balancedArea = Math.max(0, Math.round((data.acres - safeArea) * 4) / 4);

  return {
    data,
    scores,
    village,
    saving,
    stageLabel,
    gwLabel,
    recommendation:
      `${data.name} garu, avoid paddy this week. After the next effective rain, sow ${safeArea} acre red gram` +
      (balancedArea > 0 ? ` and ${balancedArea} acre maize.` : "."),
    sms:
      `${data.village}: Avoid paddy this week. Sow red gram first; maize only after 10 mm rain. Estimated seed-risk saving Rs ${saving.toLocaleString("en-IN")}.`,
    drySpell:
      `No effective rain is forecast for 7 days near ${data.village}. Delay sowing until the next 10 mm rain event and avoid about Rs ${saving.toLocaleString("en-IN")} in seed risk.`,
    reasons: {
      redGram: "Safe crop - low water demand, MSP support, better under dry-spell risk",
      maize: "Balanced - sow only after 10 mm effective rain",
      paddy: data.groundwater === "deep" ? "Avoid - groundwater and seed-loss risk" : "Only if assured irrigation continues",
    },
    rsk: {
      center: village.rsk,
      priority: data.stage === "flowering" ? "Urgent" : "Review",
      confidence: data.voiceNote.toLowerCase().includes("aaku") ? 39 : 72,
    },
  };
}

export function createRskTicket(input) {
  const advisory = generateAdvisory(input);
  const now = new Date("2026-07-07T09:00:00+05:30");
  return {
    id: `RSK-${advisory.data.village.slice(0, 3).toUpperCase()}-${Math.round(advisory.data.acres * 100)}`,
    createdAt: now.toISOString(),
    farmer: advisory.data.name,
    village: advisory.data.village,
    stage: advisory.stageLabel,
    center: advisory.rsk.center,
    confidence: advisory.rsk.confidence,
    priority: advisory.rsk.priority,
    summary:
      `Voice/photo note: "${advisory.data.voiceNote}". Attach soil, rainfall anomaly ${advisory.village.rainfallAnomaly}%, SAR wetness ${advisory.village.sarWetness}, and crop portfolio.`,
  };
}

export function districtSummary() {
  return [
    { village: "Kothapalli", risk: 78, cases: 7, signal: "Dry spell + yellow leaves" },
    { village: "Ramapuram", risk: 64, cases: 3, signal: "Sowing delay" },
    { village: "Chennapuram", risk: 84, cases: 9, signal: "Low wetness cluster" },
  ];
}

function clamp(value) {
  return Math.max(0, Math.min(99, Math.round(value)));
}

function label(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
