import { districtSummary } from "./advisory-engine.js";

const signals = districtSummary();
document.querySelector("#districtSignals").innerHTML = signals
  .map((item) => `<article class="ticket"><span>${item.risk}% risk</span><strong>${item.village}</strong><p>${item.cases} cases · ${item.signal}</p></article>`)
  .join("");

document.querySelector("#broadcastCopy").textContent =
  "Broadcast to Kothapalli and Chennapuram: delay sowing until next effective rain. Red gram is safer than paddy under current groundwater and wetness signals.";

const canvas = document.querySelector("#districtCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#dce8cd";
ctx.fillRect(0, 0, canvas.width, canvas.height);
signals.forEach((item, index) => {
  const x = 120 + index * 220;
  const y = 140 + (index % 2) * 95;
  ctx.fillStyle = item.risk > 80 ? "#b94a3a" : item.risk > 70 ? "#b77a1c" : "#2f7a4f";
  ctx.beginPath();
  ctx.arc(x, y, 48 + item.cases, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#17241a";
  ctx.font = "700 18px Inter, sans-serif";
  ctx.fillText(item.village, x - 52, y + 82);
});
ctx.strokeStyle = "#2f7fa3";
ctx.lineWidth = 16;
ctx.beginPath();
ctx.moveTo(0, 395);
ctx.bezierCurveTo(180, 340, 320, 420, 520, 360);
ctx.bezierCurveTo(610, 332, 675, 360, 760, 330);
ctx.stroke();
