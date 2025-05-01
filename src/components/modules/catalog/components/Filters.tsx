import PriceRangeFilter from "./PriceRange";
import FilterSelect from "./FilterSelector";
import ResetFiltersButton from "./ResetFiltersButton";

export default function Filters({ filters }: { filters: BaseFilters }) {
    return (
        <div className="flex flex-col gap-3">
            <PriceRangeFilter
                minPrice={Math.floor(filters.min_price)}
                maxPrice={Math.ceil(filters.max_price)}
            />
            {Object.entries(filters).map(([key, options]) =>
                key !== 'min_price' && key !== 'max_price' && Array.isArray(options) && (
                    <FilterSelect
                        key={key}
                        label={{
                            diameter: 'Діаметр',
                            length: 'Довжина',
                            thickness: 'Товщина',
                            angle: 'Кут',
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
