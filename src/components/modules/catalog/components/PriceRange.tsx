'use client'
import { usePriceRange } from "../hooks/usePriceRange";

export default function PriceRangeFilter({ minPrice, maxPrice, step = 1 }: { minPrice: number, maxPrice: number, step?: number }) {
    const { low, high, activeThumb, handleLowChange, handleHighChange, handleLowInput, handleHighInput, handleThumbMouseDown, left, width, loading } = usePriceRange(minPrice, maxPrice);

    if (loading) {
        return (
            <div className="w-full space-y-3 animate-pulse">
                <div className="h-5 bg-gray-300 rounded w-20" />
                <div className="flex items-center gap-2">
                    <div className="w-full h-9 bg-gray-200 rounded-lg" />
                    <div className="text-gray-300 text-sm">—</div>
                    <div className="w-full h-9 bg-gray-200 rounded-lg" />
                </div>
                <div className="relative h-4">
                    <div className="absolute inset-0 bg-gray-200 rounded-full" />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full space-y-3">
            <h3 className="text-sm font-medium text-gray-900 ml-0.5">Ціна, ₴</h3>

            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min={minPrice}
                    max={high}
                    value={low}
                    onChange={handleLowInput}
                    className="w-full h-9 rounded-lg border border-gray-300 px-2.5 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    placeholder="Від"
                />
                <span className="text-gray-400 text-sm">—</span>
                <input
                    type="number"
                    min={low}
                    max={maxPrice}
                    value={high}
                    onChange={handleHighInput}
                    className="w-full h-9 rounded-lg border border-gray-300 px-2.5 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    placeholder="До"
                />
            </div>

            <div className="relative h-4">
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                <div
                    className="absolute h-1.5 bg-gray-900 rounded-full top-1/2 -translate-y-1/2"
                    style={{ left: `${left}%`, width: `${width}%` }}
                />

                <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    step={step}
                    value={low}
                    onChange={handleLowChange}
                    onMouseDown={() => handleThumbMouseDown('low')}
                    className={`absolute inset-0 h-4 w-full appearance-none bg-transparent cursor-pointer ${activeThumb === 'low' ? 'z-30' : 'z-20'}`}
                />
                <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    step={step}
                    value={high}
                    onChange={handleHighChange}
                    onMouseDown={() => handleThumbMouseDown('high')}
                    className={`absolute inset-0 h-4 w-full appearance-none bg-transparent cursor-pointer ${activeThumb === 'high' ? 'z-30' : 'z-20'}`}
                />
            </div>
        </div>
    );
}
