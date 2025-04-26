"use client";

import Link from "next/link";
import { menuItems } from "../constants";

export default function MobileMenu() {
    return (
        <div className="flex lg:hidden w-full bg-white p-3 justify-around">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="flex flex-1 items-center justify-center p-2 transition-colors text-gray-600 hover:text-gray-900"
                    >
                        {Icon && <Icon className="h-6 w-6" />}
                    </Link>
                );
            })}
        </div>
    );
}
