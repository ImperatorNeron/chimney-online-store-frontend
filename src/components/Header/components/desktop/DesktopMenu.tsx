'use client';

import Actions from "./Actions";
import CatalogButton from "./CatalogButton";
import SearchBar from "./SearchBar";

export const DesktopMenu = () => (
    <div className="hidden lg:flex gap-4 items-center w-full">
        <CatalogButton />
        <SearchBar />
        <Actions />
    </div>
);