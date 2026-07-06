const transcript = document.querySelector("#callTranscript");
const callState = document.querySelector("#callState");
const smsText = document.querySelector("#smsText");
const ticketQueue = document.querySelector("#ticketQueue");
const queueCount = document.querySelector("#queueCount");

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

document.querySelector("#startCall").addEventListener("click", () => {
  setCallState("Calling back", "active");
  transcript.innerHTML = `
    <p><strong>IVR:</strong> Namaskaram. Mee bhoomi salahaa kosam oka prashna adugandi.</p>
    <p><strong>Farmer:</strong> Ee varsham lo ye pantalu veyali?</p>
    <p><strong>ASR slots:</strong> Crop choice · Kothapalli · Kharif · low-risk preference.</p>
    <p><strong>Engine:</strong> Soil Health Card + Sentinel-1 wetness + 7-day forecast + MSP price risk.</p>
  `;

  window.setTimeout(() => {
    setCallState("Answered", "done");
    transcript.insertAdjacentHTML("beforeend", `<p><strong>Kisan Alert:</strong> ${teluguAdvice}</p>`);
    smsText.textContent =
      "Avoid paddy this week. Sow 1.5 acre red gram + 0.5 acre maize after 10 mm rain. Expected seed-risk saving: Rs 3,800.";
    speakAdvice();
  }, 800);
});

document.querySelector("#sendPhoto").addEventListener("click", () => {
  ticketQueue.insertAdjacentHTML(
    "afterbegin",
    `<article class="ticket urgent">
      <span>New</span>
      <strong>Voice/photo log · confidence 39%</strong>
      <p>Farmer said "aaku pasupu." AI cannot separate nitrogen stress from early pest damage, so RSK review is required.</p>
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

  ctx.fillStyle = "#1b2a24";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 140; i += 1) {
    ctx.fillStyle = i % 3 === 0 ? "rgba(103, 194, 124, 0.16)" : "rgba(228, 191, 97, 0.11)";
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
    { x: 55, y: 60, width: 150, height: 105, color: "#4d965f" },
    { x: 245, y: 58, width: 184, height: 118, color: "#d28a58" },
    { x: 470, y: 86, width: 180, height: 96, color: "#68a968" },
    { x: 80, y: 230, width: 185, height: 126, color: "#c78b4f" },
    { x: 312, y: 232, width: 150, height: 120, color: "#5fb06d" },
    { x: 520, y: 245, width: 145, height: 108, color: "#c5a460" },
  ];

  fields.forEach((field, index) => {
    ctx.save();
    ctx.translate(field.x + field.width / 2, field.y + field.height / 2);
    ctx.rotate((index - 2) * 0.025);
    ctx.fillStyle = field.color;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
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

  ctx.fillStyle = "#f6f7f4";
  ctx.font = "700 19px Inter, sans-serif";
  ctx.fillText("Raju plot: Sentinel-1 wetness low", 236, 38);
  ctx.font = "700 14px Inter, sans-serif";
  ctx.fillText("NDVI stable, SAR moisture dropping", 252, 153);
}

drawSatellite();
