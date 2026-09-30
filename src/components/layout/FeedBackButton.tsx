'use client'
import { useState } from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

import FeedBackFormOverlay from "../modules/contacts/components/FeedBackFormOverlay";

export default function FeedBackButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => { setIsOpen(!isOpen) }}
                className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 p-3 shadow-lg transition-colors duration-200 hover:bg-gray-600 z-50"
                aria-label="Відкрити форму зворотного зв'язку"
            >
                <ChatBubbleOvalLeftEllipsisIcon
                    className="h-6 w-6 text-white"
                    strokeWidth={2}
                />
            </button>
            <FeedBackFormOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}