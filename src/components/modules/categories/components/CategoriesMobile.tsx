// components/categories/CategoriesMobile.tsx
"use client";

import { useState } from "react";
import { MainCategoryRow } from "./MainCategoryRow";
import { SubCategoriesGrid } from "./SubCategoriesGrid";
import { listReadCategorySchema } from "@/api/types/types";

interface CategoriesMobileProps {
  categories: listReadCategorySchema;
}

export function CategoriesMobile({ categories = [] }: CategoriesMobileProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const mainCategories = categories.filter((cat) => cat.parent_id == null);

  const toggleExpanded = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section aria-label="Категорії товарів" className="h-full rounded-[28px] px-2 sm:px-3">
      <div className="space-y-2">
        {mainCategories.map((main) => {
          const children = categories.filter((child) => child.parent_id === main.id);
          const isExpanded = expandedSlug === main.slug;

          return (
            <div key={main.slug} className="rounded-lg border bg-white">
              <MainCategoryRow
                category={main}
                childrenCount={children.length}
                showChevron={children.length > 0}
                isExpanded={isExpanded}
                onToggle={() => toggleExpanded(main.slug)}
              />

              {children.length > 0 && isExpanded && (
                <div className="border-t border-zinc-100 bg-zinc-50 p-4">
                  <SubCategoriesGrid mainSlug={main.slug} subCategories={children} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}