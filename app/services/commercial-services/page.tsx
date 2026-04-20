import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import {
  commercialCategories,
  commercialSubcategories,
  industriesServed,
  serviceAreas,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Commercial Services Toronto & GTA",
  description:
    "Commercial renovation, painting, landscaping, door and window repair for office, retail, industrial, and hospitality properties across the GTA.",
  alternates: {
    canonical: "/services/commercial-services",
  },
};

export default function CommercialServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="text-sm text-[#666] hover:text-[#111]">
          ← Back to Yavamo
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] mt-6">
          <div>
            <span className="inline-flex rounded-full bg-[#FEF7E8] px-4 py-2 text-sm font-medium text-[#A66C00]">
              Commercial services in Toronto and the GTA
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-[#111]">
              Renovation and property services for businesses and facilities.
            </h1>
            <p className="mt-4 text-lg text-[#666] max-w-3xl">
              The uploaded Yavamo app clearly serves offices, retail, industrial, and hospitality properties.
              This page is aligned to those industries and the actual commercial service catalog shown in the app.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {industriesServed.map((industry) => (
                <span key={industry} className="rounded-full bg-[#F5F5F5] px-3 py-1.5 text-sm text-[#444]">
                  {industry}
                </span>
              ))}
            </div>
          </div>
          <BookingForm
            defaultService="Commercial services"
            description="Book commercial work for office, retail, industrial, or hospitality locations."
            serviceLine="Commercial Services"
            title="Book commercial services"
          />
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(commercialSubcategories).map(([key, items]) => (
            <article key={key} className="rounded-2xl border border-[#E5E5E5] p-6">
              <h2 className="text-xl font-semibold text-[#111] mb-4">
                {commercialCategories.find((category) => category.id === key)?.label}
              </h2>
              <ul className="space-y-3 text-sm text-[#444]">
                {items.map((item) => (
                  <li key={item.name} className="flex items-start justify-between gap-4">
                    <span>{item.name}</span>
                    <span className="font-medium text-[#111]">{item.price}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-3xl bg-[#111] px-6 py-8 text-white">
          <h2 className="text-2xl font-semibold">Commercial coverage</h2>
          <p className="mt-3 max-w-3xl text-white/70">
            Use this page for SEO around commercial renovation and maintenance across Toronto and the GTA,
            especially when targeting office, retail, industrial, and hospitality decision-makers.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <span key={area} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/75">
                {area}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
