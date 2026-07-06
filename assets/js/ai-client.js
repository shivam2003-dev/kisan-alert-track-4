export async function requestAiEnhancement(advisory) {
  const proxyUrl = window.localStorage?.getItem("kisanAiProxyUrl");
  if (!proxyUrl) {
    return { mode: "disabled", text: "AI proxy not configured; deterministic agronomy engine used." };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(advisory),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`AI proxy returned ${response.status}`);
    }
    const result = await response.json();
    const text = result.advice || result.choices?.[0]?.message?.content || "AI proxy responded without advisory text.";
    return { mode: "ai", text };
  } catch (error) {
    return { mode: "fallback", text: `AI proxy unavailable; deterministic agronomy engine used. ${error.message}` };
  } finally {
    window.clearTimeout(timeout);
  }
}
