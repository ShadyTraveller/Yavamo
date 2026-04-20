"use client";

import Link from "next/link";
import { contact, NavSection } from "@/lib/services";

interface HeaderProps {
  activeNav: NavSection;
  onNavClick: (section: NavSection) => void;
}

export function Header({ activeNav, onNavClick }: HeaderProps) {
  const navItems: { label: string; value: NavSection }[] = [
    { label: "Home", value: "home" },
    { label: "Commercial", value: "commercial" },
    { label: "Tech", value: "tech" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F5A623] rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <Link href="/" className="text-xl font-semibold text-[#111]">Yavamo</Link>
          </div>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavClick(item.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item.value
                    ? "bg-[#F5F5F5] text-[#111]"
                    : "text-[#666] hover:text-[#111] hover:bg-[#FAFAFA]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="sm:hidden p-2 text-[#666] hover:text-[#111]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={`tel:${contact.phoneHref}`}
              className="rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm font-medium text-[#111] hover:bg-[#FAFAFA] transition-colors"
            >
              {contact.phoneDisplay}
            </a>
            <Link
              href="/book"
              className="bg-[#F5A623] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#E09515] transition-colors"
            >
              Book Online
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="sm:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onNavClick(item.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeNav === item.value
                  ? "bg-[#F5F5F5] text-[#111]"
                  : "text-[#666] hover:text-[#111]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
