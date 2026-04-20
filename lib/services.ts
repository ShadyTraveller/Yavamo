export type NavSection = "home" | "commercial" | "tech";

export interface Subcategory {
  name: string;
  price: string;
}

export interface CategoryData {
  id: string;
  label: string;
  description: string;
  icon:
    | "emergency"
    | "renovation"
    | "maintenance"
    | "seasonal"
    | "office"
    | "retail"
    | "industrial"
    | "hospitality"
    | "smart-home"
    | "security"
    | "network"
    | "solar";
}

export const contact = {
  businessName: "Yavamo",
  phoneDisplay: "(416) 659-7503",
  phoneHref: "+14166597503",
  email: "book@yavamo.ca",
  siteUrl: "https://www.yavamo.ca",
  areaLabel: "Toronto and the Greater Toronto Area",
};

export const serviceAreas = [
  "Toronto",
  "North York",
  "Etobicoke",
  "Scarborough",
  "Mississauga",
  "Brampton",
  "Vaughan",
  "Markham",
  "Richmond Hill",
  "Oakville",
  "Burlington",
  "Milton",
  "Newmarket",
  "Aurora",
  "Oshawa",
  "Ajax",
];

export const industriesServed = [
  "Office",
  "Retail",
  "Industrial",
  "Hospitality",
];

export const homeCategories: CategoryData[] = [
  { id: "emergency", label: "Emergency", description: "Urgent repairs and fixes", icon: "emergency" },
  { id: "renovation", label: "Renovation", description: "Transform your space", icon: "renovation" },
  { id: "maintenance", label: "Maintenance", description: "Keep things running", icon: "maintenance" },
  { id: "seasonal", label: "Seasonal", description: "Year-round care", icon: "seasonal" },
];

export const homeSubcategories: Record<string, Subcategory[]> = {
  emergency: [
    { name: "Foundation Repair", price: "$150/hr" },
    { name: "Basement Waterproofing", price: "$125/hr" },
    { name: "Drywall Repair", price: "$75/hr" },
    { name: "Door Repair", price: "$65/hr" },
    { name: "Window Repair", price: "$85/hr" },
    { name: "Ceiling and Attic Repair", price: "$95/hr" },
    { name: "Roofing Repair", price: "$120/hr" },
    { name: "Gutter Repair", price: "$70/hr" },
  ],
  renovation: [
    { name: "Whole Home Renovation", price: "$200/hr" },
    { name: "Interior Renovation", price: "$150/hr" },
    { name: "Exterior Renovation", price: "$175/hr" },
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
    { name: "Lawn and Yard Cleanup", price: "$55/hr" },
    { name: "BBQ Cleanup", price: "$45/hr" },
    { name: "Powerwashing", price: "$80/hr" },
  ],
};

export const commercialCategories: CategoryData[] = [
  { id: "office", label: "Office", description: "Workplace solutions", icon: "office" },
  { id: "retail", label: "Retail", description: "Store maintenance", icon: "retail" },
  { id: "industrial", label: "Industrial", description: "Facility management", icon: "industrial" },
  { id: "hospitality", label: "Hospitality", description: "Hotels and restaurants", icon: "hospitality" },
];

export const commercialSubcategories: Record<string, Subcategory[]> = {
  office: [
    { name: "Interior Renovations", price: "$175/hr" },
    { name: "Exterior Renovations", price: "$195/hr" },
    { name: "Full Scale Renovations", price: "$250/hr" },
    { name: "Painting", price: "$95/hr" },
    { name: "Landscaping", price: "$85/hr" },
    { name: "Door Repair and Replacement", price: "$110/hr" },
    { name: "Window Repair and Replacement", price: "$120/hr" },
  ],
  retail: [
    { name: "Interior Renovations", price: "$185/hr" },
    { name: "Exterior Renovations", price: "$210/hr" },
    { name: "Full Scale Renovations", price: "$275/hr" },
    { name: "Painting", price: "$100/hr" },
    { name: "Landscaping", price: "$90/hr" },
    { name: "Door Repair and Replacement", price: "$115/hr" },
    { name: "Window Repair and Replacement", price: "$125/hr" },
  ],
  industrial: [
    { name: "Interior Renovations", price: "$200/hr" },
    { name: "Exterior Renovations", price: "$225/hr" },
    { name: "Full Scale Renovations", price: "$300/hr" },
    { name: "Painting", price: "$110/hr" },
    { name: "Landscaping", price: "$95/hr" },
    { name: "Door Repair and Replacement", price: "$130/hr" },
    { name: "Window Repair and Replacement", price: "$140/hr" },
  ],
  hospitality: [
    { name: "Interior Renovations", price: "$195/hr" },
    { name: "Exterior Renovations", price: "$220/hr" },
    { name: "Full Scale Renovations", price: "$285/hr" },
    { name: "Painting", price: "$105/hr" },
    { name: "Landscaping", price: "$90/hr" },
    { name: "Door Repair and Replacement", price: "$120/hr" },
    { name: "Window Repair and Replacement", price: "$130/hr" },
  ],
};

export const techCategories: CategoryData[] = [
  { id: "smart-home", label: "Smart Home", description: "Home automation", icon: "smart-home" },
  { id: "security", label: "Security", description: "Protection systems", icon: "security" },
  { id: "network", label: "Network", description: "Connectivity solutions", icon: "network" },
  { id: "solar", label: "Solar", description: "Green energy", icon: "solar" },
];

export const techSubcategories: Record<string, Subcategory[]> = {
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
    { name: "Maintenance and Repair", price: "$125/hr" },
  ],
};

export function getSectionData(activeNav: NavSection) {
  switch (activeNav) {
    case "commercial":
      return {
        title: "Commercial Services",
        subtitle: "Office, retail, industrial, and hospitality solutions",
        categories: commercialCategories,
        subcategories: commercialSubcategories,
      };
    case "tech":
      return {
        title: "Tech Services",
        subtitle: "Smart-home, security, network, and solar solutions",
        categories: techCategories,
        subcategories: techSubcategories,
      };
    default:
      return {
        title: "Home Services",
        subtitle: "Emergency, renovation, maintenance, and seasonal care",
        categories: homeCategories,
        subcategories: homeSubcategories,
      };
  }
}
