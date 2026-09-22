// components/categories/MainCategoryRow.tsx
"use client";

import Link from "next/link";
import { CategoryImage } from "./CategoryImage";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { joinMediaPath } from "@/utils/utils";

interface MainCategoryRowProps {
  category: {
    id: number;
    slug: string;
    name: string;
    file_path?: string | null;
  };
  childrenCount: number;
  isExpanded?: boolean;
  onToggle?: () => void;
  showChevron?: boolean;
}

export function MainCategoryRow({
  category,
  childrenCount,
  isExpanded,
  onToggle,
  showChevron = true,
}: MainCategoryRowProps) {
  const imageSrc = joinMediaPath("categories", category.file_path);
  return (
    <div className="group flex items-center gap-3 px-3 py-3 transition-all duration-200">
      <Link
        href={`/catalog/${category.slug}`}
        className="flex min-w-0 flex-1 items-center gap-3"
        title={category.name}
      >
        <CategoryImage
          imageSrc={imageSrc}
          alt={category.name}
          size={56}
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-medium text-zinc-950">
            {category.name}
          </h3>
        </div>
      </Link>

      {showChevron && childrenCount > 0 && (
        <button
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Згорнути підкатегорії" : "Розгорнути підкатегорії"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        >
          {isExpanded ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}