import { createRskTicket } from "./advisory-engine.js";

const tickets = [
  createRskTicket({ name: "Raju", village: "Kothapalli", acres: 2, nitrogen: "low", ph: 7.8, groundwater: "deep", stage: "flowering", voiceNote: "Aaku pasupu kanipistundi" }),
  createRskTicket({ name: "Lakshmi", village: "Chennapuram", acres: 1.5, nitrogen: "medium", ph: 7.2, groundwater: "deep", stage: "sowing", voiceNote: "Varsham ledu, beejam vesala?" }),
];

const list = document.querySelector("#rskTicketList");
const action = document.querySelector("#expertAction");

function render() {
  list.innerHTML = tickets
    .map(
      (ticket) => `<article class="ticket urgent"><span>${ticket.priority}</span><strong>${ticket.id} · ${ticket.farmer} · ${ticket.village}</strong><p>${ticket.summary}</p></article>`,
    )
    .join("");
  action.innerHTML = `<p><strong>Next action:</strong> Call ${tickets[0].farmer}, confirm symptoms, and return voice advice.</p>`;
}

document.querySelector("#resolveFirst").addEventListener("click", () => {
  const ticket = tickets.shift();
  action.innerHTML = `<p><strong>Resolved:</strong> ${ticket.id}</p><p>RSK advice: nutrient stress likely. Wait for rain, apply nitrogen split, no pesticide today.</p>`;
  render();
});

render();
