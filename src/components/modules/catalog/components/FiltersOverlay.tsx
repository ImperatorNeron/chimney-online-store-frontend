import OverlayHeader from "@/components/shared/OverlayHeader";
import Overlay from "@/components/ui/Overlay";
import Filters from "./Filters";
import { ProductFiltersSchema } from "@/api/types/types";

export default function FiltersOverlay({ isOpen, onClose, filters }: { isOpen: boolean; onClose: () => void, filters: ProductFiltersSchema }) {
    return (
        <Overlay isOpen={isOpen} onClose={onClose}>
            <OverlayHeader onClose={onClose} title="Фільтри" />
            <div className="p-4">
                <Filters filters={filters} />
                <button className="w-full p-2.5 rounded-lg bg-gray-800 text-white mt-3" onClick={onClose}>
                    ОК
                </button>
            </div>
        </Overlay>
    );
}