"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [plannerCategory, setPlannerCategory] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState(serviceAreas[0]);
  const [selectedPropertyType, setSelectedPropertyType] = useState("House");
  const [selectedService, setSelectedService] = useState<Subcategory | null>(null);

  const sectionData = getSectionData(activeNav);
  const plannerServices =
    sectionData.subcategories[plannerCategory] ||
    sectionData.subcategories[sectionData.categories[0]?.id] ||
    [];
  const plannerCategoryLabel =
    sectionData.categories.find((category) => category.id === plannerCategory)?.label ||
    sectionData.categories[0]?.label ||
    "";

  useEffect(() => {
    if (!sectionData.categories.length) {
      setPlannerCategory("");
      return;
    }

    const fallbackCategory = sectionData.categories[0].id;
    if (!plannerCategory || !sectionData.categories.some((category) => category.id === plannerCategory)) {
      setPlannerCategory(fallbackCategory);
    }
  }, [activeNav, plannerCategory, sectionData.categories]);

  const handleNavClick = (section: NavSection) => {
    setActiveNav(section);
    const nextSectionData = getSectionData(section);
    const nextCategory = nextSectionData.categories[0]?.id ?? null;

    setPlannerCategory(nextCategory ?? "");
    setActiveCategory(nextCategory);
    setSelectedService(null);
  };

  const handleCategoryClick = (category: string | null) => {
    if (category) {
      setPlannerCategory(category);
    }
    setActiveCategory(category);
    setSelectedService(null);
  };

  const handleBackToCategories = () => {
    setActiveCategory(null);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeNav={activeNav} onNavClick={handleNavClick} />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {!activeCategory && <HeroAnimation />}

        {!activeCategory ? (
          <div className="animate-fadeIn relative z-10">
            <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start mb-12">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#111]">
                  Yavamo makes booking services simple.
                </h1>
                <p className="mt-4 text-base sm:text-lg text-[#666] max-w-2xl lg:max-w-none">
                  Choose the service, type then book. Whether it&apos;s for your home,
                  office, retail, industrial or hospital, Yavamo!
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
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
                    Email
                  </a>
                  <Link
                    href="/book"
                    className="rounded-xl border border-[#111] px-5 py-3 text-sm font-medium text-[#111] transition-colors hover:bg-[#111] hover:text-white"
                  >
                    Book Online
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-[#E5E5E5] bg-white p-5 shadow-[0_24px_80px_-42px_rgba(17,17,17,0.35)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="mt-2 text-2xl font-semibold text-[#111]">
                      Work Order Request
                    </h2>
                  </div>
                </div>

                <div className="mt-5 grid gap-5">
                  <div>
                    <p className="text-sm font-medium text-[#111]">1. Pick a service</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(["home", "commercial", "tech"] as NavSection[]).map((section) => {
                        const isActive = activeNav === section;
                        return (
                          <button
                            key={section}
                            onClick={() => handleNavClick(section)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-[#111] text-white"
                                : "bg-[#F5F5F5] text-[#444] hover:bg-[#ECECEC]"
                            }`}
                          >
                            {section === "home"
                              ? "Home"
                              : section === "commercial"
                                ? "Commercial"
                                : "Tech"}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#111]">2. Type</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {sectionData.categories.map((category) => {
                        const isActive = plannerCategory === category.id;
                        return (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-[#F5A623] text-white"
                                : "border border-[#E5E5E5] text-[#444] hover:bg-[#FAFAFA]"
                            }`}
                          >
                            {category.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-[#111]">
                      3. Where should we go?
                      <select
                        value={selectedArea}
                        onChange={(event) => setSelectedArea(event.target.value)}
                        className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm font-normal text-[#111]"
                      >
                        {serviceAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-[#111]">
                      4. What property?
                      <select
                        value={selectedPropertyType}
                        onChange={(event) => setSelectedPropertyType(event.target.value)}
                        className="rounded-xl border border-[#E5E5E5] px-4 py-3 text-sm font-normal text-[#111]"
                      >
                        {["House", "Condo", "Office", "Retail", "Industrial", "Hospitality"].map(
                          (property) => (
                            <option key={property} value={property}>
                              {property}
                            </option>
                          )
                        )}
                      </select>
                    </label>
                  </div>

                  <div className="rounded-2xl bg-[#FAFAFA] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="mt-1 text-sm text-[#666]">
                          {selectedArea} · {selectedPropertyType}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2">
                      {plannerServices.slice(0, 4).map((service) => (
                        <button
                          key={service.name}
                          onClick={() => setSelectedService(service)}
                          className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-left transition-colors hover:bg-[#FEF7E8]"
                        >
                          <span>
                            <span className="block text-sm font-medium text-[#111]">{service.name}</span>
                            <span className="block text-xs text-[#666]">Starting from {service.price}</span>
                          </span>
                          <span className="rounded-full bg-[#FEF7E8] px-2.5 py-1 text-xs font-medium text-[#A66C00]">
                            View
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/book"
                      className="rounded-xl border border-[#E5E5E5] px-5 py-3 text-sm font-medium text-[#111] transition-colors hover:bg-[#FAFAFA]"
                    >
                      Continue to booking
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-semibold text-[#111]">
                    {sectionData.title}
                  </h2>
                  <p className="mt-2 text-[#666] max-w-2xl">
                    {sectionData.subtitle}. Choose a category below to browse services,
                    open prices, and jump into booking without leaving the page.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sectionData.categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        plannerCategory === category.id
                          ? "bg-[#111] text-white"
                          : "bg-[#F5F5F5] text-[#444] hover:bg-[#ECECEC]"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              <CategoryCards categories={sectionData.categories} onCategoryClick={handleCategoryClick} />
            </section>

            <section className="rounded-3xl bg-[#111] px-6 py-8 text-white">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Yavamo where?</h2>
                  <p className="text-white/70 max-w-2xl mb-5">We service Toronto and the GTA.</p>
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
          serviceLine={sectionData.title}
          selectedArea={selectedArea}
          selectedPropertyType={selectedPropertyType}
        />
      )}
    </div>
  );
}
