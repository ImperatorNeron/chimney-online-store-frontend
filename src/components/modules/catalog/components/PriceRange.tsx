'use client'
import { usePriceRange } from "../hooks/usePriceRange";


export default function PriceRangeFilter({ minPrice, maxPrice, step = 1, }: { minPrice: number, maxPrice: number, step?: number }) {
    const { low, high, activeThumb, handleLowChange, handleHighChange, handleThumbMouseDown, left, width, loading } = usePriceRange(minPrice, maxPrice);

    if (loading) {
        return (
            <div className="w-full space-y-3 animate-pulse">
                <div className="flex justify-between">
                    <div className="h-[22px] bg-gray-300 rounded w-24" />
                    <div className="flex justify-center gap-3">
                        <div className="h-[22px] w-10 bg-gray-300 rounded" />
                        <div className="h-[22px] w-10 bg-gray-300 rounded" />
                    </div>
                </div>

                <div className="relative h-5 mt-2">
                    <div className="absolute inset-0 bg-gray-300 rounded-full" />
                    <div className="absolute h-1.5 bg-gray-400 rounded-full top-1/2 -translate-y-1/2 left-1/4 w-1/2" />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-900 ml-0.5">Ціновий діапазон</h3>
                <div className="flex gap-1">
                    <div className="px-2 py-1 bg-white border border-gray-300 rounded-md text-xs text-gray-900">
                        {low} ₴
                    </div>
                    <div className="px-2 py-1 bg-white border border-gray-300 rounded-md text-xs text-gray-900">
                        {high} ₴
                    </div>
                </div>
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
                    disabled={loading}
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
                    disabled={loading}
                    className={`absolute inset-0 h-4 w-full appearance-none bg-transparent cursor-pointer ${activeThumb === 'high' ? 'z-30' : 'z-20'}`}
                />
            </div>
        </div>
    );
}