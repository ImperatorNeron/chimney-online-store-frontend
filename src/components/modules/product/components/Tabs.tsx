'use client';

import { useState } from "react";

interface TabsProps {
    description: string;
    specifications: { name: string; value: string }[];
}

export default function Tabs({ description, specifications }: TabsProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'specs'>('specs');

    return (
        <div className="mt-12">
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`px-4 py-2 text-lg ${activeTab === 'description'
                        ? 'border-b-2 border-gray-900 text-gray-900 font-semibold'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Опис
                </button>
                <button
                    onClick={() => setActiveTab('specs')}
                    className={`px-4 py-2 text-lg ${activeTab === 'specs'
                        ? 'border-b-2 border-gray-900 text-gray-900 font-semibold'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Характеристики
                </button>
            </div>

            <div className="mt-6">
                {activeTab === 'description' && (
                    <div className="prose max-w-none">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">
                            Детальний опис товару
                        </h3>
                        <div
                            className="text-gray-600"
                            itemProp="description"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-16">
                        {specifications.map((spec) => (
                            <div key={spec.name} className="flex gap-4 justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">{spec.name}</span>
                                <span className="text-gray-900 font-semibold truncate">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
