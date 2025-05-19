'use client'

import { useState } from "react";
import OrderHeader from "./OrderHeader";
import OrderDetails from "./OrderDetails";
import { Order } from "@/api/types/types";

export default function OrderItem({ order }: { order: Order }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-all duration-200">
            <button
                className="w-full text-left p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                onClick={() => setIsOpen(prev => !prev)}
            >
                <OrderHeader order={order} isOpen={isOpen} />
            </button>
            <div
                className={`overflow-hidden transition-[max-height] duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
            >
                <OrderDetails order={order} />
            </div>
        </div>
    );
};