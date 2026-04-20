import { NextRequest, NextResponse } from "next/server";

function normalize(payload: Record<string, unknown>) {
  return {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    phone: String(payload.phone || "").trim(),
    postal_code: String(payload.postal_code || "").trim(),
    service_line: String(payload.service_line || "").trim(),
    service_type: String(payload.service_type || "General inquiry").trim(),
    industry: String(payload.industry || "").trim(),
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
    created_at: new Date().toISOString(),
  };
}

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const leadsTable = process.env.LEADS_TABLE || "leads";

  return NextResponse.json({
    ok: true,
    configured: Boolean(supabaseUrl && serviceRoleKey),
    leadsTable,
  });
}

export async function POST(request: NextRequest) {
  const payload = normalize(await request.json());

  if (!payload.name || !payload.email || !payload.phone || !payload.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const leadsTable = process.env.LEADS_TABLE || "leads";

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { ok: false, error: "Supabase environment variables are not configured" },
      { status: 503 }
    );
  }

  const response = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/${leadsTable}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json(
      { ok: false, error: "Supabase insert failed", details: text },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
