import OpenCatalogButton from "@/components/modules/menu/components/OpenCatalogButton";
import DesktopHeaderActions from "./DesktopHeaderActions";
import SearchBar from "@/components/modules/catalog/components/SearchBar";

export default function DesktopHeader() {
    return (
        <div className="hidden lg:flex gap-4 items-center w-full">
            <OpenCatalogButton />
            <SearchBar />
            <DesktopHeaderActions />
        </div>
    );
};
