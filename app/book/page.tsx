import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { contact } from "@/lib/services";

export const metadata: Metadata = {
  title: "Book Online",
  description:
    "Book Yavamo home services, commercial services, or tech services online across Toronto and the Greater Toronto Area.",
  alternates: {
    canonical: "/book",
  },
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link href="/" className="text-sm text-[#666] hover:text-[#111]">
            ← Back to Yavamo
          </Link>
          <h1 className="mt-4 text-4xl font-semibold text-[#111]">Book Yavamo online</h1>
          <p className="mt-3 max-w-2xl text-[#666]">
            Choose the service, submit your preferred timing, and we’ll confirm by email or phone.
            Changes and cancellations are handled by email at {contact.email}.
          </p>
        </div>
        <BookingForm
          defaultService="General booking request"
          description="Use this page for home, commercial, or tech bookings anywhere in Toronto and the GTA."
          serviceLine="General"
          title="Online booking"
        />
      </div>
    </main>
  );
}
