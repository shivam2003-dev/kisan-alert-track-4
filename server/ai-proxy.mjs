import http from "node:http";

const apiKey = process.env.OPENROUTER_API_KEY;
const port = Number(process.env.PORT || 8787);

if (!apiKey) {
  console.warn("OPENROUTER_API_KEY is not set. The proxy will return deterministic fallback advice.");
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "POST" || req.url !== "/api/advisory") {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
    return;
  }

  const body = await readBody(req);
  const payload = JSON.parse(body || "{}");

  if (!apiKey) {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ mode: "fallback", advice: "Use the rule engine result. Set OPENROUTER_API_KEY on the server for AI enrichment." }));
    return;
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "openai/gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are an agronomy advisory assistant for small farmers in rural India. Be concise, safe, and route uncertainty to RSK experts." },
        { role: "user", content: JSON.stringify(payload) },
      ],
    }),
  });

  const result = await response.json();
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(result));
});

server.listen(port, () => {
  console.log(`AI proxy listening on http://localhost:${port}`);
});

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}
