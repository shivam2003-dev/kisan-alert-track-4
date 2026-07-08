import { createRskTicket, generateAdvisory as buildAdvisory } from "./assets/js/advisory-engine.js";
import { requestAiEnhancement } from "./assets/js/ai-client.js";

const transcript = document.querySelector("#callTranscript");
const callState = document.querySelector("#callState");
const smsText = document.querySelector("#smsText");
const ticketQueue = document.querySelector("#ticketQueue");
const queueCount = document.querySelector("#queueCount");
const farmerForm = document.querySelector("#farmerForm");

const teluguAdvice =
  "రాజు గారు, మీ భూమిలో నత్రజని తక్కువగా ఉంది, బోరు నీరు లోతుగా ఉంది. ఈ వారం వరి వేయకండి. మంచి వాన వచ్చిన తర్వాత ఒకటిన్నర ఎకరాల్లో కంది, అర ఎకరంలో మొక్కజొన్న వేయండి.";

function setCallState(label, mode) {
  callState.textContent = label;
  callState.className = `status ${mode || ""}`.trim();
}

function speakAdvice() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(teluguAdvice);
  utterance.lang = "te-IN";
  utterance.rate = 0.92;
  window.speechSynthesis.speak(utterance);
}

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function readForm() {
  const formData = new FormData(farmerForm);
  return {
    name: formData.get("farmerName") || "Farmer",
    village: formData.get("village") || "Kothapalli",
    acres: Number(formData.get("acres") || 2),
    nitrogen: formData.get("nitrogen") || "low",
    ph: Number(formData.get("ph") || 7.8),
    groundwater: formData.get("groundwater") || "deep",
    stage: formData.get("stage") || "sowing",
    voiceNote: formData.get("voiceNote") || "",
  };
}

function generateAdvisory(data) {
  const advisory = buildAdvisory(data);

  document.querySelector("#redScore").textContent = advisory.scores.redGram;
  document.querySelector("#maizeScore").textContent = advisory.scores.maize;
  document.querySelector("#paddyScore").textContent = advisory.scores.paddy;
  document.querySelector("#chipNitrogen").textContent = `Soil N ${advisory.data.nitrogen}`;
  document.querySelector("#chipPh").textContent = `pH ${advisory.data.ph.toFixed(1)}`;
  document.querySelector("#chipGw").textContent = `GW ${advisory.gwLabel}`;
  document.querySelector("#stageOut").textContent = advisory.stageLabel;

  document.querySelector("#redReason").textContent = advisory.reasons.redGram;
  document.querySelector("#maizeReason").textContent = advisory.reasons.maize;
  document.querySelector("#paddyReason").textContent = advisory.reasons.paddy;
  document.querySelector("#drySpellCopy").textContent = advisory.drySpell;

  setCallState("Generated", "done");
  transcript.innerHTML = `
    <p><strong>Farmer:</strong> ${advisory.data.voiceNote}</p>
    <p><strong>ASR slots:</strong> ${advisory.data.village} · ${advisory.data.acres} acres · ${advisory.stageLabel} · nitrogen ${advisory.data.nitrogen} · groundwater ${advisory.gwLabel}.</p>
    <p><strong>Engine:</strong> Soil Health Card + Sentinel-1 wetness + 7-day forecast + MSP price risk.</p>
    <p><strong>KisanVaani:</strong> ${advisory.recommendation}</p>
  `;
  smsText.textContent = advisory.sms;

  requestAiEnhancement(advisory).then((ai) => {
    if (ai.mode === "ai") {
      transcript.insertAdjacentHTML("beforeend", `<p><strong>AI agronomist:</strong> ${escapeHtml(ai.text)}</p>`);
    }
  });
}

farmerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = readForm();
  generateAdvisory(data);
  speakAdvice();
});

function simulateCallBack() {
  const data = readForm();
  setCallState("Calling back", "active");
  transcript.innerHTML = `
    <p><strong>IVR:</strong> Namaskaram. Mee bhoomi salahaa kosam oka prashna adugandi.</p>
    <p><strong>Farmer:</strong> ${data.voiceNote}</p>
    <p><strong>ASR slots:</strong> Crop choice · ${data.village} · Kharif · ${data.stage}.</p>
    <p><strong>Engine:</strong> Soil Health Card + Sentinel-1 wetness + 7-day forecast + MSP price risk.</p>
  `;

  window.setTimeout(() => {
    generateAdvisory(data);
    transcript.insertAdjacentHTML("beforeend", `<p><strong>Telugu voice:</strong> ${teluguAdvice}</p>`);
    speakAdvice();
  }, 800);
}

document.querySelector("#sendPhoto").addEventListener("click", () => {
  const data = readForm();
  const ticket = createRskTicket(data);
  ticketQueue.insertAdjacentHTML(
    "afterbegin",
    `<article class="ticket urgent">
      <span>New</span>
      <strong>${ticket.id} · ${ticket.farmer} · ${ticket.village} · confidence ${ticket.confidence}%</strong>
      <p>${ticket.summary}</p>
    </article>`,
  );
  queueCount.textContent = "3 open";
});

document.querySelector("#closeTicket").addEventListener("click", () => {
  setCallState("RSK follow-up sent", "done");
  smsText.textContent = "RSK: Nutrient stress likely. Wait for rain, then apply N split. Do not spray pesticide today.";
  ticketQueue.insertAdjacentHTML(
    "afterbegin",
    `<article class="ticket">
      <span>Closed</span>
      <strong>RSK advice delivered by IVR + SMS</strong>
      <p>Correction saved as training label and district early-warning signal.</p>
    </article>`,
  );
  queueCount.textContent = "2 open";
});

function drawSatellite() {
  const canvas = document.querySelector("#satelliteCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = "#dce8cd";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 140; i += 1) {
    ctx.fillStyle = i % 3 === 0 ? "rgba(86, 142, 71, 0.18)" : "rgba(190, 147, 78, 0.16)";
    ctx.beginPath();
    ctx.ellipse(
      Math.random() * w,
      Math.random() * h,
      14 + Math.random() * 42,
      5 + Math.random() * 16,
      Math.random() * 3,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  const fields = [
    { x: 55, y: 60, width: 150, height: 105, color: "#68a35d" },
    { x: 245, y: 58, width: 184, height: 118, color: "#c9804d" },
    { x: 470, y: 86, width: 180, height: 96, color: "#79b56b" },
    { x: 80, y: 230, width: 185, height: 126, color: "#bb8750" },
    { x: 312, y: 232, width: 150, height: 120, color: "#5aa265" },
    { x: 520, y: 245, width: 145, height: 108, color: "#c5ac68" },
  ];

  fields.forEach((field, index) => {
    ctx.save();
    ctx.translate(field.x + field.width / 2, field.y + field.height / 2);
    ctx.rotate((index - 2) * 0.025);
    ctx.fillStyle = field.color;
    ctx.strokeStyle = "rgba(255, 253, 247, 0.78)";
    ctx.lineWidth = 3;
    ctx.fillRect(-field.width / 2, -field.height / 2, field.width, field.height);
    ctx.strokeRect(-field.width / 2, -field.height / 2, field.width, field.height);
    ctx.restore();
  });

  ctx.fillStyle = "#5aa4cf";
  ctx.beginPath();
  ctx.moveTo(0, 392);
  ctx.bezierCurveTo(95, 350, 185, 420, 325, 372);
  ctx.bezierCurveTo(475, 320, 570, 388, 760, 340);
  ctx.lineTo(760, 470);
  ctx.lineTo(0, 470);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#f06b5d";
  ctx.lineWidth = 5;
  ctx.strokeRect(242, 55, 190, 124);

  ctx.fillStyle = "#17241a";
  ctx.font = "700 19px Inter, sans-serif";
  ctx.fillText("Raju plot: Sentinel-1 wetness low", 236, 38);
  ctx.font = "700 14px Inter, sans-serif";
  ctx.fillText("NDVI stable, SAR moisture dropping", 252, 153);
}

drawSatellite();
generateAdvisory(readForm());

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
