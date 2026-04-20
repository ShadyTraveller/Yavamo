import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: "Book Home Services in Toronto & GTA",
  description:
    "PPC landing page for Yavamo home services in Toronto and the GTA, covering emergency repairs, renovation, maintenance, landscaping, and seasonal work.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/services/home-services",
  },
};

export default function HomeServicesLandingPage() {
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
              Book home services in Toronto and the GTA.
            </h1>
            <p className="mt-4 text-lg text-[#666] max-w-2xl">
              Use this page for paid campaigns around emergency repairs, renovation, maintenance,
              landscaping, painting, BBQ cleanup, and powerwashing.
            </p>
          </div>
          <BookingForm
            compact
            defaultService="Home services PPC"
            description="Designed for high-intent ad traffic. Submit the request and we’ll confirm by email or phone."
            serviceLine="Home Services"
            title="Request home services"
          />
        </section>
      </div>
    </main>
  );
}
