"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { joinMediaPath } from "@/utils/utils";

export type ChildCategoryItem = {
  id: number;
  slug: string;
  name: string;
  file_path?: string | null;
};

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ChildCategoryCard({ category, mainCategorySlug }: { category: ChildCategoryItem; mainCategorySlug: string }) {
  const imageSrc = joinMediaPath("categories", mainCategorySlug, category.file_path);

  return (
    <Link
      href={`/catalog/${mainCategorySlug}/${category.slug}`}
      title={category.name}
      className="group block w-[90px] flex-shrink-0 scroll-ml-4 transition-all hover:scale-[1.02] sm:w-[100px] md:w-[110px]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 transition-shadow group-hover:shadow-sm">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={category.name}
            fill
            sizes="110px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}
      </div>

      <div className="mt-1.5 text-center text-xs font-medium leading-tight text-gray-700 line-clamp-2 group-hover:text-gray-900 sm:text-sm">
        {category.name}
      </div>
    </Link>
  );
}

export default function ChildCategories({
  mainCategorySlug,
  categories,
  className = "",
}: {
  mainCategorySlug: string;
  categories: ChildCategoryItem[];
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const checkScrollButtons = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.children[0]?.clientWidth ?? 100;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => checkScrollButtons();
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    const observer = new ResizeObserver(handleScroll);
    observer.observe(container);

    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      observer.disconnect();
    };
  }, [checkScrollButtons]);

  if (!categories?.length) return null;

  return (
    <section className={`relative bg-white pb-4 border-b border-gray-200 ${className}`}>
      <div className="relative mt-2 px-4">
        {/* Navigation buttons */}
        {showLeftButton && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur-sm transition hover:bg-white focus:outline-none"
            aria-label="Попередні категорії"
          >
            <ChevronLeftIcon />
          </button>
        )}

        {showRightButton && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur-sm transition hover:bg-white focus:outline-none"
            aria-label="Наступні категорії"
          >
            <ChevronRightIcon />
          </button>
        )}

        {/* Scrollable slider */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {categories.map((category) => (
            <div key={category.id} className="scroll-ml-4 scroll-snap-align-start">
              <ChildCategoryCard mainCategorySlug={mainCategorySlug} category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}