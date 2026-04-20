import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { serviceAreas, techCategories, techSubcategories } from "@/lib/services";

export const metadata: Metadata = {
  title: "Tech Services Toronto & GTA",
  description:
    "Smart-home, security, network, WiFi, server, and solar services for homes and businesses across Toronto and the GTA.",
  alternates: {
    canonical: "/services/tech-services",
  },
};

export default function TechServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="text-sm text-[#666] hover:text-[#111]">
          ← Back to Yavamo
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] mt-6">
          <div>
            <span className="inline-flex rounded-full bg-[#FEF7E8] px-4 py-2 text-sm font-medium text-[#A66C00]">
              Tech services in Toronto and the GTA
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-[#111]">
              Smart-home, security, network, and solar support.
            </h1>
            <p className="mt-4 text-lg text-[#666] max-w-3xl">
              This route now reflects the actual uploaded tech catalog: smart-home setup, security systems,
              networking, WiFi, Ethernet, server work, and solar services for homes and commercial spaces.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {techCategories.map((category) => (
                <span key={category.id} className="rounded-full bg-[#F5F5F5] px-3 py-1.5 text-sm text-[#444]">
                  {category.label}
                </span>
              ))}
            </div>
          </div>
          <BookingForm
            defaultService="Tech services"
            description="Book on-site tech support and systems work across Toronto and the GTA."
            serviceLine="Tech Services"
            title="Book tech services"
          />
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(techSubcategories).map(([key, items]) => (
            <article key={key} className="rounded-2xl border border-[#E5E5E5] p-6">
              <h2 className="text-xl font-semibold text-[#111] mb-4">
                {techCategories.find((category) => category.id === key)?.label}
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
          <h2 className="text-2xl font-semibold">Tech coverage</h2>
          <p className="mt-3 max-w-3xl text-white/70">
            Use this page for SEO around smart-home, security, WiFi, networking, and solar service searches in Toronto and the GTA.
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
