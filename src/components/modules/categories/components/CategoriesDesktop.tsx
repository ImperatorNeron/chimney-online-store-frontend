// components/categories/CategoriesDesktop.tsx
"use client";

import { useState } from "react";
import { MainCategoryRow } from "./MainCategoryRow";
import { SubCategoriesGrid } from "./SubCategoriesGrid";
import { listReadCategorySchema } from "@/api/types/types";

interface CategoriesDesktopProps {
  categories: listReadCategorySchema;
}

export function CategoriesDesktop({ categories = [] }: CategoriesDesktopProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const mainCategories = categories.filter((cat) => cat.parent_id == null);

  return (
    <section aria-label="Категорії товарів" className="h-full rounded-[28px] px-2 sm:px-3">
      <div className="space-y-2">
        {mainCategories.map((main) => {
          const children = categories.filter((child) => child.parent_id === main.id);
          const isOpen = hoveredSlug === main.slug;

          return (
            <div
              key={main.slug}
              className="relative"
              onMouseEnter={() => setHoveredSlug(main.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <div className="rounded-lg border bg-white">
                <MainCategoryRow
                  category={main}
                  childrenCount={children.length}
                  showChevron={children.length > 0}
                  isExpanded={isOpen}
                />
              </div>

              {children.length > 0 && (
                <div
                  className={`absolute left-full top-0 z-50 pl-3 transition-all duration-200 ${isOpen
                      ? "pointer-events-auto translate-x-0 opacity-100"
                      : "pointer-events-none -translate-x-2 opacity-0"
                    }`}
                >
                  <div className="w-[min(720px,calc(100vw-520px))]">
                    <div className="max-h-[calc(100vh-170px)] overflow-y-auto rounded-lg bg-gray-50 p-1 shadow-2xl">
                      <SubCategoriesGrid
                        mainSlug={main.slug}
                        subCategories={children}
                        className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}