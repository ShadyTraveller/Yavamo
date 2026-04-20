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
  NavSection,
  serviceAreas,
  Subcategory,
} from "@/lib/services";

const propertyOptions = ["Condo", "House", "Office", "Retail", "Industrial", "Hospitality"];

const sectionLabels: Record<NavSection, string> = {
  home: "Home Auto",
  commercial: "Commercial",
  tech: "Tech",
};

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
  const featuredPricing = plannerServices.slice(0, 3);
  const bookingHref = `/book?line=${encodeURIComponent(sectionData.title)}${
    plannerCategoryLabel ? `&service=${encodeURIComponent(plannerCategoryLabel)}` : ""
  }`;

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
    const nextCategory = nextSectionData.categories[0]?.id ?? "";

    setPlannerCategory(nextCategory);
    setActiveCategory(null);
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
    <div className="min-h-screen bg-[#fbfbf9] text-[#111]">
      <Header activeNav={activeNav} onNavClick={handleNavClick} />

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {!activeCategory && <HeroAnimation />}

        {!activeCategory ? (
          <div className="relative z-10 animate-fadeIn space-y-10">
            <section className="overflow-hidden rounded-[36px] border border-[#e8e4db] bg-white shadow-[0_30px_90px_-50px_rgba(17,17,17,0.35)]">
              <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,166,35,0.14),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.05),transparent_38%)]" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#f0e2bf] bg-[#fff6e6] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#a66c00]">
                      Now in Toronto & GTA
                    </div>
                    <p className="mt-6 text-sm font-medium uppercase tracking-[0.28em] text-[#7e786c]">
                      Getting work done, made simple
                    </p>
                    <h1 className="mt-4 max-w-xl text-5xl font-semibold leading-[0.94] tracking-tight text-[#111] sm:text-6xl">
                      Your space,
                      <br />
                      handled.
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-7 text-[#5c574f] sm:text-lg">
                      The managed booking experience for home, commercial, and tech services.
                      Fixed starting prices. Fast scheduling. Clean communication.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={`tel:${contact.phoneHref}`}
                        className="rounded-2xl bg-[#f5a623] px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#e09515]"
                      >
                        {contact.phoneDisplay}
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        className="rounded-2xl border border-[#ddd7cc] bg-white px-5 py-3 text-sm font-medium text-[#111] transition-colors hover:bg-[#faf8f2]"
                      >
                        Email
                      </a>
                      <Link
                        href={bookingHref}
                        className="rounded-2xl border border-[#111] px-5 py-3 text-sm font-medium text-[#111] transition-colors hover:bg-[#111] hover:text-white"
                      >
                        Book Online
                      </Link>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {[
                        "Vetted professionals",
                        "Fixed starting prices",
                        "Fast online booking",
                        "Email-based changes",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-[#efe9dc] bg-white/85 px-4 py-4 text-sm font-medium text-[#2f2a22] shadow-sm backdrop-blur"
                          style={{ animationDelay: `${index * 80}ms` }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#efe9dc] bg-[#f8f4eb] p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <div className="rounded-[28px] bg-white p-5 shadow-[0_26px_70px_-44px_rgba(17,17,17,0.35)] sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#a66c00]">
                          001 — Book fast
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-[#111]">
                          Work order request
                        </h2>
                      </div>
                      <span className="rounded-full bg-[#111] px-3 py-1 text-xs font-medium text-white">
                        {sectionLabels[activeNav]}
                      </span>
                    </div>

                    <div className="mt-6 space-y-5">
                      <div>
                        <p className="text-sm font-medium text-[#111]">Service line</p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {(["home", "commercial", "tech"] as NavSection[]).map((section) => {
                            const isActive = activeNav === section;
                            return (
                              <button
                                key={section}
                                onClick={() => handleNavClick(section)}
                                className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                  isActive
                                    ? "bg-[#111] text-white shadow-lg"
                                    : "bg-[#f5f3ee] text-[#4f4a43] hover:bg-[#ece7dd]"
                                }`}
                              >
                                {section === "home" ? "Home" : section === "commercial" ? "Commercial" : "Tech"}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#111]">Type of work</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {sectionData.categories.map((category) => {
                            const isActive = plannerCategory === category.id;
                            return (
                              <button
                                key={category.id}
                                onClick={() => setPlannerCategory(category.id)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                  isActive
                                    ? "bg-[#f5a623] text-white shadow-[0_12px_32px_-18px_rgba(245,166,35,0.9)]"
                                    : "border border-[#e6dfd2] bg-white text-[#5b554c] hover:bg-[#faf8f2]"
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
                          Where should we come?
                          <select
                            value={selectedArea}
                            onChange={(event) => setSelectedArea(event.target.value)}
                            className="rounded-2xl border border-[#e6dfd2] bg-[#fbfaf6] px-4 py-3 text-sm text-[#111]"
                          >
                            {serviceAreas.map((area) => (
                              <option key={area} value={area}>
                                {area}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="grid gap-2 text-sm font-medium text-[#111]">
                          Property type
                          <select
                            value={selectedPropertyType}
                            onChange={(event) => setSelectedPropertyType(event.target.value)}
                            className="rounded-2xl border border-[#e6dfd2] bg-[#fbfaf6] px-4 py-3 text-sm text-[#111]"
                          >
                            {propertyOptions.map((property) => (
                              <option key={property} value={property}>
                                {property}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <div className="rounded-[24px] border border-[#eee7da] bg-[#fcfbf8] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[#111]">{plannerCategoryLabel || sectionData.title}</p>
                            <p className="mt-1 text-sm text-[#6b655c]">
                              {selectedArea} · {selectedPropertyType}
                            </p>
                          </div>
                          <button
                            onClick={() => handleCategoryClick(plannerCategory)}
                            className="rounded-full border border-[#e6dfd2] bg-white px-3 py-1.5 text-xs font-medium text-[#111] hover:bg-[#f8f4eb]"
                          >
                            View all
                          </button>
                        </div>
                        <div className="mt-4 space-y-2">
                          {plannerServices.slice(0, 3).map((service) => (
                            <button
                              key={service.name}
                              onClick={() => setSelectedService(service)}
                              className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fff7e8] hover:shadow-sm"
                            >
                              <span>
                                <span className="block text-sm font-medium text-[#111]">{service.name}</span>
                                <span className="block text-xs text-[#70695f]">From {service.price}</span>
                              </span>
                              <span className="rounded-full bg-[#fff2d8] px-2.5 py-1 text-xs font-medium text-[#a66c00]">
                                View
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={bookingHref}
                        className="flex items-center justify-center rounded-2xl bg-[#111] px-5 py-3.5 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1d1d1d]"
                      >
                        Book now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-[#e8e4db] bg-white px-6 py-8 shadow-sm sm:px-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#a66c00]">
                    002 — Services
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#111]">
                    Everything you need.
                  </h2>
                  <p className="mt-3 max-w-2xl text-base text-[#625c52]">
                    One clean booking surface. Switch between service lines, browse the work,
                    and open prices without leaving the page.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sectionData.categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setPlannerCategory(category.id)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        plannerCategory === category.id
                          ? "bg-[#111] text-white"
                          : "bg-[#f5f3ee] text-[#514b42] hover:bg-[#ece7dd]"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <CategoryCards categories={sectionData.categories} onCategoryClick={handleCategoryClick} />
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <article className="rounded-[32px] border border-[#e8e4db] bg-[#111] px-6 py-8 text-white sm:px-8">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">
                  003 — How it works
                </p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight">
                  Three steps.
                  <br />
                  That&apos;s it.
                </h2>
                <p className="mt-4 max-w-xl text-base text-white/70">
                  We engineered the friction out of booking. Pick the service, confirm the basics,
                  and move straight into the request flow.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    {
                      number: "01",
                      title: "Choose",
                      body: "Switch between home, commercial, and tech, then pick the work type that fits.",
                    },
                    {
                      number: "02",
                      title: "Book",
                      body: "Select your area, property, and preferred service, then send the request online.",
                    },
                    {
                      number: "03",
                      title: "Done",
                      body: "We confirm by phone or email. Changes and cancellations stay simple through email.",
                    },
                  ].map((step) => (
                    <div
                      key={step.number}
                      className="rounded-3xl border border-white/10 bg-white/5 px-5 py-5 backdrop-blur"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#111]">
                          {step.number}
                        </span>
                        <div>
                          <p className="text-lg font-semibold text-white">{step.title}</p>
                          <p className="mt-1 text-sm text-white/70">{step.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[32px] border border-[#e8e4db] bg-white px-6 py-8 shadow-sm sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#a66c00]">
                      004 — Pricing
                    </p>
                    <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#111]">
                      No surprises.
                      <br />
                      Ever.
                    </h2>
                  </div>
                  <div className="rounded-full bg-[#f8f4eb] px-4 py-2 text-sm font-medium text-[#6a6257]">
                    {sectionData.title}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {featuredPricing.map((service, index) => {
                    const isFeatured = index === 1;
                    return (
                      <button
                        key={service.name}
                        onClick={() => setSelectedService(service)}
                        className={`rounded-[28px] border p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                          isFeatured
                            ? "border-[#f5c56f] bg-[#fff6e5] shadow-[0_24px_60px_-40px_rgba(245,166,35,0.75)]"
                            : "border-[#ece6db] bg-[#fcfbf8]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-[#6f675c]">
                            {index === 1 ? "Popular" : "Starting from"}
                          </span>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#111]">
                            {plannerCategoryLabel}
                          </span>
                        </div>
                        <p className="mt-6 text-3xl font-semibold text-[#111]">{service.price}</p>
                        <h3 className="mt-6 text-lg font-semibold text-[#111]">{service.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#665f54]">
                          Clean scope, fast response, and a simple handoff into call, email, or online booking.
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#111]">
                          View service
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </article>
            </section>

            <section className="rounded-[32px] border border-[#e8e4db] bg-white px-6 py-8 shadow-sm sm:px-8">
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#a66c00]">
                    Built for the GTA
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#111]">
                    Your neighborhood.
                    <br />
                    Your people.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base text-[#625c52]">
                    We service Toronto and the GTA with one clear booking experience across homes,
                    offices, retail spaces, industrial properties, and hospitality locations.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-[#ece5d9] bg-[#faf8f3] px-3 py-1.5 text-sm text-[#514c44]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] bg-[#111] p-6 text-white shadow-[0_24px_70px_-44px_rgba(17,17,17,0.65)]">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">
                    Booking and cancellations
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">Simple by design.</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Call, email, or book online. We confirm directly, and changes stay easy through
                    email instead of forcing customers into accounts or dashboards.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${contact.email}`}
                      className="rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-[#111]"
                    >
                      Email booking
                    </a>
                    <Link
                      href={bookingHref}
                      className="rounded-2xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10"
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
              className="mb-6 flex items-center gap-2 text-[#666] transition-colors hover:text-[#111]"
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
            <h2 className="mb-2 text-2xl font-semibold text-[#111] capitalize">
              {sectionData.categories.find((category) => category.id === activeCategory)?.label || activeCategory}
            </h2>
            <p className="mb-6 text-[#666]">
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
