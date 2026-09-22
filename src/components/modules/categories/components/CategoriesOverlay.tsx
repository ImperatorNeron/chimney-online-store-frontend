'use client'

import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowRightIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    PhotoIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline'
import Overlay from '@/components/ui/Overlay'
import OverlayHeader from '@/components/shared/OverlayHeader'
import useCatalog from '../hooks/useCatalog'
import { joinMediaPath } from '@/utils/utils'

type Category = {
    id: number
    name: string
    slug: string
    file_path?: string | null
}

function CategoryThumb({ src, alt }: { src?: string | null; alt: string }) {
    return (
        <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 1024px) 70px, 90px"
                    className="object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <PhotoIcon className="h-5 w-5" />
                </div>
            )}
        </div>
    )
}

export default function CategoriesOverlay({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
    const { isLoading, mainCategories, childCategories, isMobile } = useCatalog()
    const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null)
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
    const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(null)

    useEffect(() => {
        if (!isOpen) {
            setExpandedCategoryId(null)
            setHoveredCategoryId(null)
        }
    }, [isOpen])

    useEffect(() => {
        if (mainCategories.length === 0) return
        const selectedExists = mainCategories.some((category) => category.id === selectedCategoryId)
        if (!selectedExists) {
            setSelectedCategoryId(mainCategories[0].id)
        }
    }, [mainCategories, selectedCategoryId])

    const activeCategory = useMemo(() => {
        if (!mainCategories.length) return null
        const activeId = hoveredCategoryId ?? selectedCategoryId ?? mainCategories[0].id
        return mainCategories.find((category) => category.id === activeId) ?? mainCategories[0]
    }, [mainCategories, hoveredCategoryId, selectedCategoryId])

    const activeSubCategories = useMemo(() => {
        if (!activeCategory) return []
        return childCategories(activeCategory.id)
    }, [activeCategory, childCategories])

    const handleToggleMobile = (categoryId: number, e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setExpandedCategoryId((current) => (current === categoryId ? null : categoryId))
    }

    const renderMainCategoryRow = (category: Category) => {
        const isExpanded = expandedCategoryId === category.id
        const isActive = activeCategory?.id === category.id
        const imageSrc = category.file_path ? joinMediaPath('categories', category.file_path) : null

        return (
            <div key={category.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center gap-3 p-3">
                    <Link
                        href={`/catalog/${category.slug}`}
                        onClick={onClose}
                        className="flex min-w-0 flex-1 items-center gap-3"
                    >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                            {imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    alt={category.name}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                    <Squares2X2Icon className="h-5 w-5" />
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <div className="truncate font-medium text-gray-900">{category.name}</div>
                        </div>
                    </Link>
                    <button
                        type="button"
                        onClick={(e) => handleToggleMobile(category.id, e)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600"
                        aria-label="Показати підкатегорії"
                    >
                        <ChevronDownIcon
                            className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
                                }`}
                        />
                    </button>
                </div>

                {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50/70 p-3">
                        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                            {childCategories(category.id).map((child) => {
                                const childImage = child.file_path
                                    ? joinMediaPath('categories', category.slug, child.file_path)
                                    : null
                                return (
                                    <Link
                                        key={child.id}
                                        href={`/catalog/${category.slug}/${child.slug}`}
                                        onClick={onClose}
                                        className="group rounded-lg border border-gray-200 bg-white p-1.5"
                                    >
                                        <CategoryThumb src={childImage} alt={child.name} />
                                        <div className="mt-1.5 line-clamp-2 text-center min-h-[28px] text-[14px] font-medium text-gray-900">
                                            {child.name}
                                        </div>
                                        <div className="mb-1 flex items-center justify-center gap-0.5 text-[11px] text-gray-500">
                                            Переглянути <ArrowRightIcon className="h-2.5 w-2.5" />
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}

                {isActive && !isExpanded && <div className="hidden" />}
            </div>
        )
    }

    if (isMobile) {
        return (
            <Overlay isOpen={isOpen} onClose={onClose} className="w-full lg:hidden">
                <div className="flex h-full flex-col overflow-hidden bg-white">
                    <OverlayHeader onClose={onClose} title="Каталог" />
                    <div className="flex-1 overflow-y-auto px-4 pb-5 pt-4">
                        <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
                                    <Squares2X2Icon className="h-5 w-5 text-gray-700" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Каталог категорій</div>
                                    <div className="text-xs text-gray-500">Обирайте потрібний розділ</div>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="py-10 text-center text-gray-500">Завантаження категорій...</div>
                        ) : (
                            <div className="space-y-3">{mainCategories.map((category) => renderMainCategoryRow(category))}</div>
                        )}
                    </div>
                </div>
            </Overlay>
        )
    }

    return (
        <Overlay
            isOpen={isOpen}
            onClose={onClose}
            className="w-full overflow-hidden rounded-none border border-gray-200 bg-white lg:absolute lg:left-1/2 lg:mt-[72px] lg:h-[min(600px,calc(100vh-88px))] lg:w-[min(1200px,calc(100vw-24px))] lg:-translate-x-1/2 lg:rounded-2xl"
        >
            <div className="flex h-full min-h-0 flex-col overflow-hidden">
                <div className="lg:hidden">
                    <OverlayHeader onClose={onClose} title="Каталог" />
                </div>

                {/* Wrapper for hover management: when mouse leaves this area, hover is cleared */}
                <div
                    className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[clamp(280px,30vw,420px)_minmax(0,1fr)]"
                    onMouseLeave={() => setHoveredCategoryId(null)}
                >
                    <aside className="min-h-0 border-b border-gray-200 bg-gray-50/80 px-4 py-4 lg:border-b-0 lg:border-r lg:px-5 lg:py-5">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                                    Каталог
                                </div>
                                <h3 className="mt-1 text-lg font-semibold text-gray-900">Головні категорії</h3>
                            </div>
                            <div className="hidden h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white lg:flex">
                                <Squares2X2Icon className="h-5 w-5 text-gray-700" />
                            </div>
                        </div>

                        <div className="min-h-0 space-y-2 overflow-y-auto pr-1 lg:max-h-[calc(100vh-210px)]">
                            {mainCategories.map((category) => {
                                const isActive = activeCategory?.id === category.id
                                const itemImage = category.file_path
                                    ? joinMediaPath('categories', category.file_path)
                                    : null

                                return (
                                    <Link
                                        key={category.id}
                                        href={`/catalog/${category.slug}`}
                                        onMouseEnter={() => setHoveredCategoryId(category.id)}
                                        onFocus={() => setHoveredCategoryId(category.id)}
                                        onClick={onClose}
                                        className={`group flex items-center gap-3 rounded-xl border px-3 py-3 transition-colors ${isActive
                                            ? 'border-gray-300 bg-gray-100'
                                            : 'border-transparent bg-white hover:border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                                            {itemImage ? (
                                                <Image
                                                    src={itemImage}
                                                    alt={category.name}
                                                    fill
                                                    sizes="48px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                                    <PhotoIcon className="h-5 w-5" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate font-medium text-gray-900">{category.name}</div>
                                        </div>
                                        <ChevronRightIcon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-700" />
                                    </Link>
                                )
                            })}
                        </div>
                    </aside>

                    <section className="min-h-0 flex-1 bg-white px-4 py-4 lg:px-5 lg:py-5">
                        {activeCategory ? (
                            <div className="flex h-full min-h-0 flex-col">
                                <div className="mb-4 flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                                            Підкатегорії
                                        </div>
                                        <h3 className="mt-1 text-xl font-semibold text-gray-900">
                                            {activeCategory.name}
                                        </h3>
                                    </div>
                                    <Link
                                        href={`/catalog/${activeCategory.slug}`}
                                        onClick={onClose}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                                    >
                                        Всі товари <ArrowRightIcon className="h-4 w-4" />
                                    </Link>
                                </div>

                                {activeSubCategories.length > 0 ? (
                                    <div className="min-h-0 overflow-y-auto pr-1">
                                        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 xl:grid-cols-4">
                                            {activeSubCategories.map((child) => {
                                                const childImage = child.file_path
                                                    ? joinMediaPath('categories', activeCategory.slug, child.file_path)
                                                    : null
                                                return (
                                                    <Link
                                                        key={child.id}
                                                        href={`/catalog/${activeCategory.slug}/${child.slug}`}
                                                        onClick={onClose}
                                                        className="group rounded-lg border border-gray-200 bg-white p-1.5 transition-colors hover:border-gray-300 hover:bg-gray-50"
                                                    >
                                                        <CategoryThumb src={childImage} alt={child.name} />
                                                        <div className="mt-1.5 line-clamp-2 min-h-[20px] text-center text-[14px] font-medium leading-snug text-gray-900">
                                                            {child.name}
                                                        </div>
                                                        <div className="my-1 flex items-center justify-center gap-0.5 text-[11px] text-gray-500">
                                                            Переглянути <ArrowRightIcon className="h-2.5 w-2.5" />
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50">
                                        <div className="max-w-sm text-center">
                                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white">
                                                <Squares2X2Icon className="h-6 w-6 text-gray-400" />
                                            </div>
                                            <div className="text-base font-medium text-gray-900">
                                                У цій категорії немає підкатегорій
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Можна перейти в загальний каталог категорії.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-500">
                                Обираємо категорію...
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </Overlay>
    )
}