import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchFilter({
    value,
    onChange,
    setOffset,
    placeholder = "Пошук...",
}: {
    value: string;
    onChange: (v: string) => void;
    setOffset?: (offset: number) => void;
    placeholder?: string;
}) {
    return (
        <div className="relative flex-1 min-w-[200px]">
            <MagnifyingGlassIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
            <input
            type="text"
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 h-[35px] text-sm"
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
                if (setOffset) setOffset(0);
            }}
            placeholder={placeholder}
            />
        </div>
    );
}