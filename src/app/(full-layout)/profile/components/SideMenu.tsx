"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/outline";
import { menuItems } from "../constants";

export default function SideMenu({ username }: { username: string }) {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:block max-w-72 min-w-72 p-4 border-r border-gray-200">
            <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                    <UserIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{username}</p>
                    <p className="text-xs text-gray-500">Покупець</p>
                </div>
            </div>

            <nav>
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 transition-all
                    text-gray-600 hover:text-gray-900
                    group relative 
                    ${isActive ? "bg-gray-100 text-gray-900 shadow-sm font-semibold" : ""}
                    before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-r
                    ${isActive ?
                                            "before:bg-gray-600" :
                                            "before:opacity-0 group-hover:before:opacity-100 before:bg-gray-300"
                                        }`
                                    }
                                >
                                    <item.icon
                                        className={`h-5 w-5 flex-shrink-0
                      ${isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"}`
                                        }
                                    />
                                    <span className="text-sm">{item.title}</span>
                                    {isActive && (
                                        <div className="ml-auto w-2 h-2 bg-gray-600 rounded-full" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}