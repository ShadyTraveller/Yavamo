"use client";

import { Subcategory } from "@/lib/services";

interface SubcategoryListProps {
  subcategories: Subcategory[];
  onServiceClick: (service: Subcategory) => void;
}

export function SubcategoryList({ subcategories, onServiceClick }: SubcategoryListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {subcategories.map((service) => (
        <button
          key={service.name}
          onClick={() => onServiceClick(service)}
          className="group bg-white border border-[#E5E5E5] rounded-xl p-5 text-left transition-all hover:shadow-md hover:border-[#CCC] hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-[#111] mb-1 group-hover:text-[#111]">
                {service.name}
              </h3>
              <p className="text-sm text-[#666]">
                From <span className="font-semibold text-[#111]">{service.price}</span>
              </p>
            </div>
            <div className="w-8 h-8 bg-[#FEF7E8] rounded-lg flex items-center justify-center text-[#F5A623] group-hover:bg-[#F5A623] group-hover:text-white transition-colors">
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
          </div>
        </button>
      ))}
    </div>
  );
}
