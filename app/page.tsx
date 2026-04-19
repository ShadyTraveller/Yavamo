"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { CategoryCards } from "@/components/category-cards";
import { SubcategoryList } from "@/components/subcategory-list";
import { PricingModal } from "@/components/pricing-modal";
import { HeroAnimation } from "@/components/hero-animation";

export type NavSection = "home" | "commercial" | "tech";
export type Category = string | null;

export interface Subcategory {
  name: string;
  price: string;
}

export interface CategoryData {
  id: string;
  label: string;
  description: string;
  icon: "emergency" | "renovation" | "maintenance" | "seasonal" | "office" | "retail" | "industrial" | "hospitality" | "smart-home" | "security" | "network" | "solar";
}

// Home Services Data
const homeCategories: CategoryData[] = [
  { id: "emergency", label: "Emergency", description: "Urgent repairs & fixes", icon: "emergency" },
  { id: "renovation", label: "Renovation", description: "Transform your space", icon: "renovation" },
  { id: "maintenance", label: "Maintenance", description: "Keep things running", icon: "maintenance" },
  { id: "seasonal", label: "Seasonal", description: "Year-round care", icon: "seasonal" },
];

const homeSubcategories: Record<string, Subcategory[]> = {
  emergency: [
    { name: "Foundation Repair", price: "$150/hr" },
    { name: "Basement Waterproofing", price: "$125/hr" },
    { name: "Drywall Repair", price: "$75/hr" },
    { name: "Door Repair", price: "$65/hr" },
    { name: "Window Repair", price: "$85/hr" },
    { name: "Ceiling & Attic Repair", price: "$95/hr" },
    { name: "Roofing Repair", price: "$120/hr" },
    { name: "Gutter Repair", price: "$70/hr" },
  ],
  renovation: [
    { name: "Whole Home", price: "$200/hr" },
    { name: "Interior", price: "$150/hr" },
    { name: "Exterior", price: "$175/hr" },
  ],
  maintenance: [
    { name: "Landscaping", price: "$65/hr" },
    { name: "Gutter Replacement", price: "$85/hr" },
    { name: "Roofing Replacement", price: "$150/hr" },
    { name: "Window Replacement", price: "$100/hr" },
    { name: "Door Replacement", price: "$90/hr" },
    { name: "Painting", price: "$75/hr" },
  ],
  seasonal: [
    { name: "Lawn & Yard Cleanup", price: "$55/hr" },
    { name: "BBQ Cleanup", price: "$45/hr" },
    { name: "Powerwashing", price: "$80/hr" },
  ],
};

// Commercial Services Data
const commercialCategories: CategoryData[] = [
  { id: "office", label: "Office", description: "Workplace solutions", icon: "office" },
  { id: "retail", label: "Retail", description: "Store maintenance", icon: "retail" },
  { id: "industrial", label: "Industrial", description: "Facility management", icon: "industrial" },
  { id: "hospitality", label: "Hospitality", description: "Hotels & restaurants", icon: "hospitality" },
];

const commercialSubcategories: Record<string, Subcategory[]> = {
  office: [
    { name: "Interior Renovations", price: "$175/hr" },
    { name: "Exterior Renovations", price: "$195/hr" },
    { name: "Full Scale Renovations", price: "$250/hr" },
    { name: "Painting", price: "$95/hr" },
    { name: "Landscaping", price: "$85/hr" },
    { name: "Door Repair & Replacement", price: "$110/hr" },
    { name: "Window Repair & Replacement", price: "$120/hr" },
  ],
  retail: [
    { name: "Interior Renovations", price: "$185/hr" },
    { name: "Exterior Renovations", price: "$210/hr" },
    { name: "Full Scale Renovations", price: "$275/hr" },
    { name: "Painting", price: "$100/hr" },
    { name: "Landscaping", price: "$90/hr" },
    { name: "Door Repair & Replacement", price: "$115/hr" },
    { name: "Window Repair & Replacement", price: "$125/hr" },
  ],
  industrial: [
    { name: "Interior Renovations", price: "$200/hr" },
    { name: "Exterior Renovations", price: "$225/hr" },
    { name: "Full Scale Renovations", price: "$300/hr" },
    { name: "Painting", price: "$110/hr" },
    { name: "Landscaping", price: "$95/hr" },
    { name: "Door Repair & Replacement", price: "$130/hr" },
    { name: "Window Repair & Replacement", price: "$140/hr" },
  ],
  hospitality: [
    { name: "Interior Renovations", price: "$195/hr" },
    { name: "Exterior Renovations", price: "$220/hr" },
    { name: "Full Scale Renovations", price: "$285/hr" },
    { name: "Painting", price: "$105/hr" },
    { name: "Landscaping", price: "$90/hr" },
    { name: "Door Repair & Replacement", price: "$120/hr" },
    { name: "Window Repair & Replacement", price: "$130/hr" },
  ],
};

// Tech Services Data
const techCategories: CategoryData[] = [
  { id: "smart-home", label: "Smart Home", description: "Home automation", icon: "smart-home" },
  { id: "security", label: "Security", description: "Protection systems", icon: "security" },
  { id: "network", label: "Network", description: "Connectivity solutions", icon: "network" },
  { id: "solar", label: "Solar", description: "Green energy", icon: "solar" },
];

const techSubcategories: Record<string, Subcategory[]> = {
  "smart-home": [
    { name: "Smart Thermostat", price: "$125/hr" },
    { name: "Smart Lighting", price: "$95/hr" },
    { name: "Voice Assistant Setup", price: "$85/hr" },
    { name: "Automated Blinds", price: "$150/hr" },
    { name: "Smart Lock Install", price: "$110/hr" },
    { name: "Home Theater", price: "$200/hr" },
  ],
  security: [
    { name: "Camera Installation", price: "$145/hr" },
    { name: "Alarm Systems", price: "$175/hr" },
    { name: "Video Doorbell", price: "$95/hr" },
    { name: "Motion Sensors", price: "$85/hr" },
    { name: "Access Control", price: "$160/hr" },
  ],
  network: [
    { name: "WiFi Setup", price: "$95/hr" },
    { name: "Mesh Network", price: "$125/hr" },
    { name: "Ethernet Wiring", price: "$110/hr" },
    { name: "Network Security", price: "$140/hr" },
    { name: "Server Setup", price: "$185/hr" },
  ],
  solar: [
    { name: "Panel Installation", price: "$250/hr" },
    { name: "Battery Storage", price: "$225/hr" },
    { name: "Inverter Setup", price: "$175/hr" },
    { name: "System Monitoring", price: "$95/hr" },
    { name: "Maintenance & Repair", price: "$125/hr" },
  ],
};

export default function Home() {
  const [activeNav, setActiveNav] = useState<NavSection>("home");
  const [activeCategory, setActiveCategory] = useState<Category>(null);
  const [selectedService, setSelectedService] = useState<Subcategory | null>(null);

  const handleNavClick = (section: NavSection) => {
    setActiveNav(section);
    setActiveCategory(null);
    setSelectedService(null);
  };

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
    setSelectedService(null);
  };

  const handleBackToCategories = () => {
    setActiveCategory(null);
    setSelectedService(null);
  };

  const handleServiceClick = (service: Subcategory) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  // Get data based on active section
  const getSectionData = () => {
    switch (activeNav) {
      case "commercial":
        return {
          title: "Commercial Services",
          subtitle: "Professional solutions for your business",
          categories: commercialCategories,
          subcategories: commercialSubcategories,
        };
      case "tech":
        return {
          title: "Tech Services",
          subtitle: "Smart technology for modern living",
          categories: techCategories,
          subcategories: techSubcategories,
        };
      default:
        return {
          title: "Home Services",
          subtitle: "Select a category to get started",
          categories: homeCategories,
          subcategories: homeSubcategories,
        };
    }
  };

  const sectionData = getSectionData();

  return (
    <div className="min-h-screen bg-white">
      <Header activeNav={activeNav} onNavClick={handleNavClick} />
      
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Animated background */}
        {!activeCategory && <HeroAnimation />}
        
        {!activeCategory ? (
          <div className="animate-fadeIn relative z-10">
            <h1 className="text-3xl font-semibold text-[#111] mb-2 text-center">
              {sectionData.title}
            </h1>
            <p className="text-[#666] text-center mb-10">
              {sectionData.subtitle}
            </p>
            <CategoryCards 
              categories={sectionData.categories}
              onCategoryClick={handleCategoryClick} 
            />
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
            <h2 className="text-2xl font-semibold text-[#111] mb-6 capitalize">
              {sectionData.categories.find(c => c.id === activeCategory)?.label || activeCategory}
            </h2>
            <SubcategoryList
              subcategories={sectionData.subcategories[activeCategory] || []}
              onServiceClick={handleServiceClick}
            />
          </div>
        )}
      </main>

      {selectedService && (
        <PricingModal service={selectedService} onClose={handleCloseModal} />
      )}
    </div>
  );
}
