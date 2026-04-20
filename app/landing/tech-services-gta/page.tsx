import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: "Book Tech Services in Toronto & GTA",
  description:
    "PPC landing page for Yavamo tech services in Toronto and the GTA, including smart-home, security, network, WiFi, server, and solar work.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/services/tech-services",
  },
};

export default function TechServicesLandingPage() {
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
              Smart-home, security, network, and solar services for the GTA.
            </h1>
            <p className="mt-4 text-lg text-[#666] max-w-2xl">
              Built for paid campaigns targeting smart-home installs, cameras, alarms,
              WiFi, networking, Ethernet, server setup, and solar work.
            </p>
          </div>
          <BookingForm
            compact
            defaultService="Tech services PPC"
            description="Best for high-intent tech-service ad traffic. Submit the issue and your preferred time."
            serviceLine="Tech Services"
            title="Request tech services"
          />
        </section>
      </div>
    </main>
  );
}
