"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { contact } from "@/lib/services";

interface BookingFormProps {
  serviceLine: string;
  defaultService: string;
  title?: string;
  description?: string;
  industry?: string;
  compact?: boolean;
}

export function BookingForm({
  serviceLine,
  defaultService,
  title = "Book online",
  description = "Tell us what you need and we’ll confirm by email or phone.",
  industry = "",
  compact = false,
}: BookingFormProps) {
  const pathname = usePathname();
  const [utms, setUtms] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  const [preferredDateMin, setPreferredDateMin] = useState("");
  const [status, setStatus] = useState("");
  const [statusKind, setStatusKind] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const today = new Date();
    const isoDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    setPreferredDateMin(isoDate);

    const params = new URLSearchParams(window.location.search);
    setUtms({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus("Sending your booking request...");
    setStatusKind("idle");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Booking endpoint failed");
      }

      form.reset();
      setStatus("Thanks. Your booking request is in. We will confirm by email or phone shortly.");
      setStatusKind("success");
    } catch (_error) {
      const subject = encodeURIComponent(`New Yavamo booking: ${String(payload.service_type || defaultService)}`);
      const body = encodeURIComponent(
        [
          `Name: ${String(payload.name || "")}`,
          `Email: ${String(payload.email || "")}`,
          `Phone: ${String(payload.phone || "")}`,
          `Service line: ${String(payload.service_line || serviceLine)}`,
          `Service: ${String(payload.service_type || defaultService)}`,
          `Industry: ${String(payload.industry || industry)}`,
          `Property type: ${String(payload.property_type || "")}`,
          `Preferred date: ${String(payload.preferred_date || "")}`,
          `Preferred time: ${String(payload.preferred_time || "")}`,
          `Postal code: ${String(payload.postal_code || "")}`,
          `Address: ${String(payload.service_address || "")}`,
          `Message: ${String(payload.message || "")}`,
        ].join("\n")
      );

      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus("Automatic delivery is not configured yet, so your email app is opening instead.");
      setStatusKind("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-[#111]">{title}</h2>
        <p className="mt-2 text-sm text-[#666]">{description}</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="hidden" name="service_line" value={serviceLine} />
        <input type="hidden" name="service_type" value={defaultService} />
        <input type="hidden" name="industry" value={industry} />
        <input type="hidden" name="booking_channel" value="website" />
        <input type="hidden" name="landing_page" value={pathname} />
        <input type="hidden" name="utm_source" value={utms.utm_source} />
        <input type="hidden" name="utm_medium" value={utms.utm_medium} />
        <input type="hidden" name="utm_campaign" value={utms.utm_campaign} />
        <input type="hidden" name="utm_term" value={utms.utm_term} />
        <input type="hidden" name="utm_content" value={utms.utm_content} />

        <div className={`grid gap-4 ${compact ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
          <label className="grid gap-2 text-sm font-medium text-[#111]">
            Full name
            <input
              className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm"
              name="name"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[#111]">
            Phone
            <input
              className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm"
              name="phone"
              required
              type="tel"
            />
          </label>
        </div>

        <div className={`grid gap-4 ${compact ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
          <label className="grid gap-2 text-sm font-medium text-[#111]">
            Email
            <input
              className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm"
              name="email"
              required
              type="email"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[#111]">
            Postal code
            <input
              className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm"
              name="postal_code"
              placeholder="M5V 2T6"
              required
            />
          </label>
        </div>

        <div className={`grid gap-4 ${compact ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
          <label className="grid gap-2 text-sm font-medium text-[#111]">
            Preferred date
            <input
              className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm"
              min={preferredDateMin}
              name="preferred_date"
              required
              type="date"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[#111]">
            Arrival window
            <select
              className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm"
              name="preferred_time"
              required
            >
              <option value="8 AM - 11 AM">8 AM - 11 AM</option>
              <option value="11 AM - 2 PM">11 AM - 2 PM</option>
              <option value="2 PM - 5 PM">2 PM - 5 PM</option>
              <option value="5 PM - 8 PM">5 PM - 8 PM</option>
              <option value="Flexible">Flexible</option>
            </select>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-[#111]">
          Property type
          <select
            className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm"
            name="property_type"
            required
          >
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="Office">Office</option>
            <option value="Retail">Retail</option>
            <option value="Industrial">Industrial</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-[#111]">
          Address or neighbourhood
          <input
            className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm"
            name="service_address"
            placeholder="Toronto, Vaughan, Mississauga, or full address"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-[#111]">
          What do you need help with?
          <textarea
            className="min-h-32 rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm"
            name="message"
            placeholder="Tell us the service, timing, and any details that help us confirm the booking."
            required
          />
        </label>

        <label className="flex items-start gap-3 text-sm text-[#444]">
          <input
            className="mt-0.5"
            name="cancellation_policy_ack"
            required
            type="checkbox"
            value="agreed"
          />
          <span>Changes and cancellations are handled by email after booking confirmation.</span>
        </label>

        <button
          className="w-full rounded-xl bg-[#F5A623] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E09515] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Request Booking"}
        </button>

        <div
          className={`min-h-5 text-sm ${
            statusKind === "success" ? "text-green-600" : statusKind === "error" ? "text-[#A66C00]" : "text-[#666]"
          }`}
        >
          {status}
        </div>
      </form>
    </div>
  );
}
