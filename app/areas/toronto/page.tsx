import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { industriesServed } from "@/lib/services";

export const metadata: Metadata = {
  title: "Toronto Home, Commercial, and Tech Services",
  description:
    "Yavamo serves Toronto with home services, commercial renovation and maintenance, and smart-home, security, network, and solar tech services.",
  alternates: {
    canonical: "/areas/toronto",
  },
};

export default function TorontoAreaPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="text-sm text-[#666] hover:text-[#111]">
          ← Back to Yavamo
        </Link>
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] mt-6">
          <div>
            <span className="inline-flex rounded-full bg-[#FEF7E8] px-4 py-2 text-sm font-medium text-[#A66C00]">
              Toronto service area
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-[#111]">
              Yavamo services Toronto homes and businesses.
            </h1>
            <p className="mt-4 text-lg text-[#666] max-w-3xl">
              This Toronto page supports local SEO for the real Yavamo offer mix shown in the uploaded app:
              home services, commercial services, and tech services.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E5E5E5] p-5">
                <h2 className="font-semibold text-[#111]">Home</h2>
                <p className="mt-2 text-sm text-[#666]">Emergency, renovation, maintenance, and seasonal services.</p>
              </div>
              <div className="rounded-2xl border border-[#E5E5E5] p-5">
                <h2 className="font-semibold text-[#111]">Commercial</h2>
                <p className="mt-2 text-sm text-[#666]">Office, retail, industrial, and hospitality renovation and maintenance.</p>
              </div>
              <div className="rounded-2xl border border-[#E5E5E5] p-5">
                <h2 className="font-semibold text-[#111]">Tech</h2>
                <p className="mt-2 text-sm text-[#666]">Smart-home, security, network, and solar solutions.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {industriesServed.map((industry) => (
                <span key={industry} className="rounded-full bg-[#F5F5F5] px-3 py-1.5 text-sm text-[#444]">
                  {industry}
                </span>
              ))}
            </div>
          </div>
          <BookingForm
            compact
            defaultService="Toronto booking request"
            description="Use this form for Toronto-area requests across home, commercial, and tech services."
            serviceLine="Toronto Service Area"
            title="Book Toronto services"
          />
        </section>
      </div>
    </main>
  );
}
