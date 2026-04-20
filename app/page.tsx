"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/header";
import { CategoryCards } from "@/components/category-cards";
import { SubcategoryList } from "@/components/subcategory-list";
import { PricingModal } from "@/components/pricing-modal";
import { HeroAnimation } from "@/components/hero-animation";
import {
  contact,
  getSectionData,
  industriesServed,
  NavSection,
  serviceAreas,
  Subcategory,
} from "@/lib/services";

export default function Home() {
  const [activeNav, setActiveNav] = useState<NavSection>("home");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Subcategory | null>(null);

  const handleNavClick = (section: NavSection) => {
    setActiveNav(section);
    setActiveCategory(null);
    setSelectedService(null);
  };

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    setSelectedService(null);
  };

  const handleBackToCategories = () => {
    setActiveCategory(null);
    setSelectedService(null);
  };

  const sectionData = getSectionData(activeNav);

  return (
    <div className="min-h-screen bg-white">
      <Header activeNav={activeNav} onNavClick={handleNavClick} />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {!activeCategory && <HeroAnimation />}

        {!activeCategory ? (
          <div className="animate-fadeIn relative z-10">
            <section className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center rounded-full bg-[#FEF7E8] px-4 py-2 text-sm font-medium text-[#A66C00]">
                Toronto and the Greater Toronto Area
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-[#111]">
                Yavamo makes booking services simple.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#666]">
                Call, email, or book online for home, commercial, and tech services.
                Yavamo serves residential properties plus offices, retail spaces,
                industrial facilities, and hospitality businesses.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="rounded-xl bg-[#F5A623] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E09515]"
                >
                  Call {contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="rounded-xl border border-[#E5E5E5] px-5 py-3 text-sm font-medium text-[#111] transition-colors hover:bg-[#FAFAFA]"
                >
                  Email {contact.email}
                </a>
                <Link
                  href="/book"
                  className="rounded-xl border border-[#111] px-5 py-3 text-sm font-medium text-[#111] transition-colors hover:bg-[#111] hover:text-white"
                >
                  Book Online
                </Link>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-semibold text-[#111] mb-2 text-center">
                {sectionData.title}
              </h2>
              <p className="text-[#666] text-center mb-8">
                {sectionData.subtitle}
              </p>
              <CategoryCards categories={sectionData.categories} onCategoryClick={handleCategoryClick} />
            </section>

            <section className="grid gap-6 lg:grid-cols-3 mb-12">
              <article className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#111] mb-3">SEO service pages</h3>
                <ul className="space-y-3 text-sm text-[#444]">
                  <li><Link className="hover:text-[#111]" href="/services/home-services">Home services</Link></li>
                  <li><Link className="hover:text-[#111]" href="/services/commercial-services">Commercial services</Link></li>
                  <li><Link className="hover:text-[#111]" href="/services/tech-services">Tech services</Link></li>
                  <li><Link className="hover:text-[#111]" href="/areas/toronto">Toronto area page</Link></li>
                </ul>
              </article>
              <article className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#111] mb-3">PPC landing pages</h3>
                <ul className="space-y-3 text-sm text-[#444]">
                  <li><Link className="hover:text-[#111]" href="/landing/home-services-gta">Home services GTA</Link></li>
                  <li><Link className="hover:text-[#111]" href="/landing/commercial-services-gta">Commercial services GTA</Link></li>
                  <li><Link className="hover:text-[#111]" href="/landing/tech-services-gta">Tech services GTA</Link></li>
                </ul>
              </article>
              <article className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#111] mb-3">Industries served</h3>
                <div className="flex flex-wrap gap-2">
                  {industriesServed.map((industry) => (
                    <span
                      key={industry}
                      className="rounded-full bg-[#F5F5F5] px-3 py-1.5 text-sm text-[#444]"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </article>
            </section>

            <section className="rounded-3xl bg-[#111] px-6 py-8 text-white">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Where Yavamo works</h2>
                  <p className="text-white/70 max-w-2xl mb-5">
                    Search and paid campaigns should reflect the actual company footprint,
                    so the site now centers on Toronto and nearby GTA cities where these services
                    can realistically be booked.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-white/5 p-5">
                  <h3 className="text-lg font-semibold mb-3">Booking and cancellations</h3>
                  <p className="text-sm text-white/75 mb-4">
                    Customers can call, email, or book online. Cancellations are handled by email,
                    keeping the process simple without accounts or dashboards.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${contact.email}`}
                      className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-[#111]"
                    >
                      Email booking
                    </a>
                    <Link
                      href="/book"
                      className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10"
                    >
                      Online booking
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <button
              onClick={handleBackToCategories}
              className="flex items-center gap-2 text-[#666] hover:text-[#111] mb-6 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to categories
            </button>
            <h2 className="text-2xl font-semibold text-[#111] mb-2 capitalize">
              {sectionData.categories.find((c) => c.id === activeCategory)?.label || activeCategory}
            </h2>
            <p className="text-[#666] mb-6">
              Browse services and open pricing to call, email, or continue into online booking.
            </p>
            <SubcategoryList
              subcategories={sectionData.subcategories[activeCategory] || []}
              onServiceClick={setSelectedService}
            />
          </div>
        )}
      </main>

      {selectedService && (
        <PricingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
