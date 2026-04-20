import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { contact } from "@/lib/services";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-white`}>
      <body className="font-sans antialiased bg-white text-[#111]">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
