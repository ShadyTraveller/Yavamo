"use client";

import { useEffect, useState } from "react";

const floatingIcons = [
  // Wrench
  { 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    delay: 0,
    position: { top: "10%", left: "8%" },
  },
  // Paintbrush
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/>
        <path d="m5 2 5 5"/>
        <path d="M2 13h6"/>
        <path d="M2 17h3"/>
        <path d="M5 21a3 3 0 0 0 0-6"/>
      </svg>
    ),
    delay: 0.5,
    position: { top: "15%", right: "12%" },
  },
  // Home
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    delay: 1,
    position: { top: "45%", left: "5%" },
  },
  // Hammer
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/>
        <path d="M17.64 15 22 10.64"/>
        <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>
      </svg>
    ),
    delay: 1.5,
    position: { top: "60%", right: "8%" },
  },
  // Leaf (landscaping)
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    delay: 2,
    position: { top: "75%", left: "15%" },
  },
  // Lightbulb
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
        <path d="M9 18h6"/>
        <path d="M10 22h4"/>
      </svg>
    ),
    delay: 2.5,
    position: { top: "25%", left: "18%" },
  },
  // Shield (security)
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    delay: 3,
    position: { top: "35%", right: "5%" },
  },
  // Sun (solar)
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/>
        <path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/>
        <path d="m19.07 4.93-1.41 1.41"/>
      </svg>
    ),
    delay: 0.8,
    position: { top: "8%", right: "25%" },
  },
];

export function HeroAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Floating icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className="absolute text-[#F5A623]/30"
          style={{
            ...item.position,
            animation: `float 6s ease-in-out infinite, fadeInIcon 0.8s ease-out forwards`,
            animationDelay: `${item.delay}s, ${item.delay}s`,
            opacity: 0,
          }}
        >
          <div 
            className="p-3 bg-[#FEF7E8] rounded-2xl shadow-sm"
            style={{
              animation: `pulse 4s ease-in-out infinite`,
              animationDelay: `${item.delay + 1}s`,
            }}
          >
            {item.icon}
          </div>
        </div>
      ))}

      {/* Animated circles */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#F5A623]/10"
        style={{
          animation: "expandCircle 8s ease-in-out infinite",
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[#F5A623]/15"
        style={{
          animation: "expandCircle 8s ease-in-out infinite 2s",
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#F5A623]/5"
        style={{
          animation: "pulse 4s ease-in-out infinite",
        }}
      />

      {/* Connecting dots animation */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
            <stop offset="50%" stopColor="#F5A623" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="10%"
          y1="20%"
          x2="90%"
          y2="80%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          style={{
            animation: "drawLine 4s ease-in-out infinite",
          }}
        />
        <line
          x1="85%"
          y1="15%"
          x2="15%"
          y2="75%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          style={{
            animation: "drawLine 4s ease-in-out infinite 2s",
          }}
        />
      </svg>
    </div>
  );
}
