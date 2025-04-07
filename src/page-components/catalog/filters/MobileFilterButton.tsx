"use client";

import React from "react";
import { FunnelIcon } from "@heroicons/react/24/solid";

const MobileFilterButton: React.FC = () => {
    return (
        <button
            className="fixed bottom-4 left-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition hover:bg-gray-900 lg:hidden"
            aria-label="Відкрити фільтри"
        >
            <FunnelIcon className="h-6 w-6" />
        </button>
    );
};

export default MobileFilterButton;
