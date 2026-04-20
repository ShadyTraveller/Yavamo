"use client";

import { useEffect } from "react";
import { contact, Subcategory } from "@/lib/services";

interface PricingModalProps {
  service: Subcategory;
  onClose: () => void;
}

export function PricingModal({ service, onClose }: PricingModalProps) {
  // Close on escape key
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

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="bg-[#FEF7E8] px-6 py-8 text-center">
          <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#111] mb-1">
            {service.name}
          </h2>
          <p className="text-[#666] text-sm">Professional service at your doorstep</p>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="bg-[#FAFAFA] rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-[#666] text-sm">Starting price</span>
              <span className="text-2xl font-bold text-[#111]">{service.price}</span>
            </div>
          </div>

          <ul className="space-y-3 mb-6">
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
              Licensed & insured professionals
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
              Satisfaction guaranteed
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
              Flexible scheduling
            </li>
          </ul>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#E5E5E5] rounded-xl text-sm font-medium text-[#666] hover:bg-[#F5F5F5] transition-colors"
            >
              Maybe Later
            </button>
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent(`Booking request: ${service.name}`)}`}
              className="flex-1 px-4 py-3 bg-[#F5A623] text-white rounded-xl text-sm font-medium hover:bg-[#E09515] transition-colors text-center"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[#666] hover:text-[#111] hover:bg-white transition-colors"
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
    </div>
  );
}
