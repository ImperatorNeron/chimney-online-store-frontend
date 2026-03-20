// components/categories/SubCategoriesGrid.tsx
"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CategoryImage } from "./CategoryImage";
import { joinMediaPath } from "@/utils/utils";

interface SubCategory {
  id: number;
  slug: string;
  name: string;
  file_path?: string | null;
}

interface SubCategoriesGridProps {
  mainSlug: string;
  subCategories: SubCategory[];
  className?: string;
}

export function SubCategoriesGrid({
  mainSlug,
  subCategories,
  className = "",
}: SubCategoriesGridProps) {
  return (
    <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${className}`}>
      {subCategories.map((child) => (
        <Link
          key={child.slug}
          href={`/catalog/${mainSlug}/${child.slug}`}
          className="group flex items-center gap-3 rounded-lg bg-white p-2 transition-all duration-200 hover:bg-zinc-100"
        >
          <CategoryImage
            imageSrc={joinMediaPath("categories", child.slug, child.file_path)}
            alt={child.name}
            size={56}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h5 className="truncate text-sm font-medium text-zinc-950">
                {child.name}
              </h5>
              <ChevronRightIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-950" />
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Перейти до підкатегорії
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}