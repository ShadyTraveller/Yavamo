function normalize(payload) {
  return {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    phone: String(payload.phone || "").trim(),
    postal_code: String(payload.postal_code || "").trim(),
    service_type: String(payload.service_type || "General inquiry").trim(),
    timeline: String(payload.timeline || "").trim(),
    message: String(payload.message || "").trim(),
    utm_source: String(payload.utm_source || "").trim(),
    utm_medium: String(payload.utm_medium || "").trim(),
    utm_campaign: String(payload.utm_campaign || "").trim(),
    utm_term: String(payload.utm_term || "").trim(),
    utm_content: String(payload.utm_content || "").trim(),
    landing_page: String(payload.landing_page || "").trim(),
    created_at: new Date().toISOString()
  };
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const payload = normalize(req.body || {});

  if (!payload.name || !payload.email || !payload.phone || !payload.message) {
    res.status(400).json({ ok: false, error: "Missing required fields" });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const leadsTable = process.env.LEADS_TABLE || "leads";

  if (!supabaseUrl || !serviceRoleKey) {
    res.status(503).json({ ok: false, error: "Supabase environment variables are not configured" });
    return;
  }

  const response = await fetch(
    supabaseUrl.replace(/\/+$/, "") + "/rest/v1/" + leadsTable,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: "Bearer " + serviceRoleKey,
        Prefer: "return=minimal"
      },
      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    const text = await response.text();
    res.status(502).json({ ok: false, error: "Supabase insert failed", details: text });
    return;
  }

  res.status(200).json({ ok: true });
};
