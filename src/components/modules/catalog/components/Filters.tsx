import PriceRangeFilter from "./PriceRange";
import FilterSelect from "./FilterSelector";
import ResetFiltersButton from "./ResetFiltersButton";
import { ProductFiltersSchema } from "@/api/types/types";

export default function Filters({ filters }: { filters: ProductFiltersSchema }) {
    return (
        <div className="flex flex-col gap-3">
            <PriceRangeFilter
                minPrice={Math.floor(filters?.min_price ?? 0)}
                maxPrice={Math.ceil(filters?.max_price ?? 0)}
            />
            {Object.entries(filters ?? {}).map(([key, options]) =>
                key !== 'min_price' && key !== 'max_price' && Array.isArray(options) && (
                    <FilterSelect
                        key={key}
                        label={{
                            diameter: 'Діаметр, мм',
                            length: 'Довжина, м',
                            thickness: 'Товщина, мм',
                            angle: 'Кут, °',
                            metal_type: 'Тип металу'
                        }[key] || ''}
                        name={key}
                        options={options}
                    />
                )
            )}
            <ResetFiltersButton />
        </div>
    );
}
