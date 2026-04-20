import type { MetadataRoute } from "next";
import { contact } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/book",
    "/services/home-services",
    "/services/commercial-services",
    "/services/tech-services",
    "/areas/toronto",
  ];

  return routes.map((route) => ({
    url: `${contact.siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
