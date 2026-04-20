import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { contact, industriesServed, serviceAreas } from "@/lib/services";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(contact.siteUrl),
  title: {
    default: "Yavamo | Home, Commercial, and Tech Services",
    template: "%s | Yavamo",
  },
  description:
    "Book trusted home services, commercial services, and tech services across Toronto and the Greater Toronto Area.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yavamo | Home, Commercial, and Tech Services",
    description:
      "Emergency, renovation, maintenance, seasonal, commercial, smart-home, security, network, and solar services across the GTA.",
    url: contact.siteUrl,
    siteName: contact.businessName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yavamo | Home, Commercial, and Tech Services",
    description:
      "Book trusted home services, commercial services, and tech services across Toronto and the Greater Toronto Area.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: contact.businessName,
      url: contact.siteUrl,
      potentialAction: {
        "@type": "ReserveAction",
        target: `${contact.siteUrl}/book`,
      },
    },
    {
      "@type": "ProfessionalService",
      name: contact.businessName,
      url: contact.siteUrl,
      email: contact.email,
      telephone: contact.phoneHref,
      areaServed: serviceAreas,
      serviceType: [
        "Home services",
        "Commercial services",
        "Tech services",
        ...industriesServed,
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-white`}>
      <body className="font-sans antialiased bg-white text-[#111]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
