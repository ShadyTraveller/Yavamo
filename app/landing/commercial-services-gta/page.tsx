import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { industriesServed } from "@/lib/services";

export const metadata: Metadata = {
  title: "Book Commercial Services in Toronto & GTA",
  description:
    "PPC landing page for Yavamo commercial services in Toronto and the GTA, serving office, retail, industrial, and hospitality properties.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/services/commercial-services",
  },
};

export default function CommercialServicesLandingPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="text-sm text-[#666] hover:text-[#111]">
          ← Back to Yavamo
        </Link>
        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] mt-6">
          <div>
            <span className="inline-flex rounded-full bg-[#FEF7E8] px-4 py-2 text-sm font-medium text-[#A66C00]">
              PPC landing page
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-[#111]">
              Commercial renovation and property services for the GTA.
            </h1>
            <p className="mt-4 text-lg text-[#666] max-w-2xl">
              Built for ad campaigns targeting commercial buyers in office, retail, industrial,
              and hospitality sectors across Toronto and nearby GTA markets.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {industriesServed.map((industry) => (
                <span key={industry} className="rounded-full bg-[#F5F5F5] px-3 py-1.5 text-sm text-[#444]">
                  {industry}
                </span>
              ))}
            </div>
          </div>
          <BookingForm
            compact
            defaultService="Commercial services PPC"
            description="Best for commercial paid traffic. Submit the location, timing, and scope and we’ll confirm."
            serviceLine="Commercial Services"
            title="Request commercial services"
          />
        </section>
      </div>
    </main>
  );
}
