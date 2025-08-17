import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function SelectFilter<T extends string>({
    value,
    onChange,
    options,
}: {
    value: T;
    onChange: (v: T) => void;
    options: { label: string; value: T }[];
}) {
    return (
        <div className="relative inline-block">
            <select
                className="appearance-none pr-8 pl-3 h-[41px] text-xs border rounded-lg font-medium focus:outline-none cursor-pointer leading-tight border-gray-300"
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
        </div>
    );
}