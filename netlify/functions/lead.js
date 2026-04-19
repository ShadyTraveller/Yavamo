function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(body)
  };
}

function normalize(payload) {
  return {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    phone: String(payload.phone || "").trim(),
    postal_code: String(payload.postal_code || "").trim(),
    service_type: String(payload.service_type || "General inquiry").trim(),
    property_type: String(payload.property_type || "").trim(),
    service_frequency: String(payload.service_frequency || "").trim(),
    preferred_date: String(payload.preferred_date || "").trim(),
    preferred_time: String(payload.preferred_time || "").trim(),
    unit_size: String(payload.unit_size || "").trim(),
    service_address: String(payload.service_address || "").trim(),
    booking_channel: String(payload.booking_channel || "").trim(),
    cancellation_policy_ack: String(payload.cancellation_policy_ack || "").trim(),
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

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return response(405, { ok: false, error: "Method not allowed" });
  }

  const payload = normalize(JSON.parse(event.body || "{}"));

  if (!payload.name || !payload.email || !payload.phone || !payload.message) {
    return response(400, { ok: false, error: "Missing required fields" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const leadsTable = process.env.LEADS_TABLE || "leads";

  if (!supabaseUrl || !serviceRoleKey) {
    return response(503, { ok: false, error: "Supabase environment variables are not configured" });
  }

  const supabaseResponse = await fetch(
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

  if (!supabaseResponse.ok) {
    const text = await supabaseResponse.text();
    return response(502, { ok: false, error: "Supabase insert failed", details: text });
  }

  return response(200, { ok: true });
};
