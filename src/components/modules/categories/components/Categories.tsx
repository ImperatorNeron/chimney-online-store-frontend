'use client'

import Link from 'next/link'
import useCategoryToggle from '../hooks/useCategoryToggle';
import { ReadCategoriesData } from '@/api/types/types';
import Image from 'next/image'


export default function Categories({ categories }: { categories: ReadCategoriesData }) {
    const { expandedSlug, toggleCategory, categoryRefs } = useCategoryToggle();

    const mainCategories = (categories || []).filter(({ parent_id }) => parent_id == null);

    if (!categories?.length) {
        return (
            <div className="max-w-7xl mx-auto text-center p-4 text-gray-500">
                Категорії відсутні
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-xl lg:text-3xl font-black mb-6 lg:mb-8 text-center uppercase tracking-tight">
                Категорії
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mainCategories.map(main => {
                    const children = categories.filter(child => child.parent_id === main.id);
                    const isExpanded = expandedSlug === main.slug;
                    const fileName = main.file_path ? main.file_path.split('/').pop() : null;
                    return (
                        <div
                            key={main.slug}
                            ref={el => { categoryRefs.current[main.slug] = el }}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 cursor-pointer relative"
                            onClick={() => toggleCategory(main.slug)}
                        >
                            <div className="p-2 pr-4">
                                <button className="flex items-center justify-between w-full group">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center relative">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/categories/${fileName}` || '/images/test.png'}
                                                alt={main.name}
                                                fill
                                                sizes="40px"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <h2 className="text-md md:text-lg font-semibold text-gray-900">
                                            <Link href={`/catalog/${main.slug}`} onClick={(e) => e.stopPropagation()}>{main.name}</Link>
                                        </h2>
                                    </div>
                                    {children.length > 0 && (
                                        <svg
                                            className={`w-5 h-5 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {children.length > 0 && (
                                <div
                                    className={`absolute top-full inset-x-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-20 transition-all duration-300 ease-in-out transform ${isExpanded
                                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                                        : 'opacity-0 -translate-y-2 pointer-events-none'
                                        }`}
                                >
                                    <ul className="p-2">
                                        {children.map(child => (
                                            <li key={child.slug}>
                                                <a
                                                    href={`/catalog/${main.slug}/${child.slug}`}
                                                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-200 transition-colors text-gray-700 hover:text-gray-900"
                                                >
                                                    <span>{child.name}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
