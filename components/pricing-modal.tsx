"use client";

import Link from "next/link";
import { useEffect } from "react";
import { contact, Subcategory } from "@/lib/services";

interface PricingModalProps {
  service: Subcategory;
  onClose: () => void;
  serviceLine?: string;
  selectedArea?: string;
  selectedPropertyType?: string;
}

export function PricingModal({
  service,
  onClose,
  serviceLine = "General booking",
  selectedArea = "Toronto",
  selectedPropertyType = "Property",
}: PricingModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      <aside className="relative ml-auto flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl">
        <div className="border-b border-[#E5E5E5] bg-[#FEF7E8] px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A66C00]">
                Booking drawer
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#111]">{service.name}</h2>
              <p className="mt-2 text-sm text-[#666]">
                Review the service, then call, email, or move straight into the booking form.
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#666] transition-colors hover:bg-white hover:text-[#111]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#111]">
              {serviceLine}
            </span>
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[#444]">
              {selectedArea}
            </span>
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[#444]">
              {selectedPropertyType}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#666]">Starting price</p>
                <p className="mt-1 text-3xl font-semibold text-[#111]">{service.price}</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-sm">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A66C00]">
                  Best for
                </p>
                <p className="mt-2 text-sm font-medium text-[#111]">{selectedArea}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-[#E5E5E5] p-5">
              <p className="text-sm font-semibold text-[#111]">What happens next</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-3 text-sm text-[#444]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  We confirm scope and timing by phone or email.
                </li>
                <li className="flex items-center gap-3 text-sm text-[#444]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Cancellations and changes stay simple through email.
                </li>
                <li className="flex items-center gap-3 text-sm text-[#444]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  No account needed to request this service.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#E5E5E5] p-5">
              <p className="text-sm font-semibold text-[#111]">Quick actions</p>
              <div className="mt-4 grid gap-3">
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="rounded-xl bg-[#111] px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#222]"
                >
                  Call {contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(`Booking request: ${service.name}`)}`}
                  className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-center text-sm font-medium text-[#111] transition-colors hover:bg-[#FAFAFA]"
                >
                  Email this service
                </a>
                <Link
                  href={`/book?service=${encodeURIComponent(service.name)}&line=${encodeURIComponent(
                    serviceLine
                  )}`}
                  className="rounded-xl bg-[#F5A623] px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#E09515]"
                >
                  Book online
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-[#FAFAFA] p-5 text-sm text-[#444]">
              <p className="font-semibold text-[#111]">Recommended details to include</p>
              <p className="mt-2">
                Mention access notes, timing preferences, and any photos or measurements that will
                help us confirm this {service.name.toLowerCase()} request faster.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5] bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm font-medium text-[#666] transition-colors hover:bg-[#F5F5F5]"
          >
            Continue browsing
          </button>
        </div>
      </aside>
    </div>
  );
}
