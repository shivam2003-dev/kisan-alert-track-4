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

function calculateScores(data) {
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
  if (data.ph > 7.5) {
    redGram += 2;
    paddy -= 4;
  }
  if (data.stage === "flowering") {
    redGram += 1;
    maize -= 2;
  }

  return {
    redGram: Math.max(0, Math.min(99, redGram)),
    maize: Math.max(0, Math.min(99, maize)),
    paddy: Math.max(0, Math.min(99, paddy)),
  };
}

function generateAdvisory(data) {
  const scores = calculateScores(data);
  const saving = Math.round(1900 * Math.max(1, data.acres));
  const stageLabel = data.stage.charAt(0).toUpperCase() + data.stage.slice(1);
  const gwLabel = data.groundwater === "deep" ? "deep / risky" : data.groundwater;

  document.querySelector("#redScore").textContent = scores.redGram;
  document.querySelector("#maizeScore").textContent = scores.maize;
  document.querySelector("#paddyScore").textContent = scores.paddy;
  document.querySelector("#chipNitrogen").textContent = `Soil N ${data.nitrogen}`;
  document.querySelector("#chipPh").textContent = `pH ${data.ph.toFixed(1)}`;
  document.querySelector("#chipGw").textContent = `GW ${gwLabel}`;
  document.querySelector("#stageOut").textContent = stageLabel;

  document.querySelector("#redReason").textContent = "Safe crop · low water demand · better under dry-spell risk";
  document.querySelector("#maizeReason").textContent = "Balanced · sow only after 10 mm effective rain";
  document.querySelector("#paddyReason").textContent =
    data.groundwater === "deep" ? "Avoid · groundwater and seed-loss risk" : "Only if assured irrigation continues";
  document.querySelector("#drySpellCopy").textContent =
    `No effective rain is forecast for 7 days near ${data.village}. Delay sowing until the next 10 mm rain event and avoid about Rs ${saving.toLocaleString("en-IN")} in seed risk.`;

  setCallState("Generated", "done");
  transcript.innerHTML = `
    <p><strong>Farmer:</strong> ${data.voiceNote}</p>
    <p><strong>ASR slots:</strong> ${data.village} · ${data.acres} acres · ${stageLabel} · nitrogen ${data.nitrogen} · groundwater ${gwLabel}.</p>
    <p><strong>Engine:</strong> Soil Health Card + Sentinel-1 wetness + 7-day forecast + MSP price risk.</p>
    <p><strong>Kisan Alert:</strong> ${data.name} garu, avoid paddy this week. After the next effective rain, sow red gram as the safe crop and maize only on the smaller balanced area.</p>
  `;
  smsText.textContent =
    `${data.village}: Avoid paddy this week. Sow red gram first; maize only after 10 mm rain. Estimated seed-risk saving Rs ${saving.toLocaleString("en-IN")}.`;
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
  ticketQueue.insertAdjacentHTML(
    "afterbegin",
    `<article class="ticket urgent">
      <span>New</span>
      <strong>${data.name} · ${data.village} · ${data.stage} stage · confidence 39%</strong>
      <p>Voice/photo note says "${data.voiceNote}". AI cannot separate nutrient stress from early pest damage, so RSK review is required.</p>
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
