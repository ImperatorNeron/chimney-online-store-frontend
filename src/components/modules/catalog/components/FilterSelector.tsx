'use client'
import { useFilterSelect } from "../hooks/useFilterSelect";
import Selector from "@/components/shared/Selector";

export default function FilterSelect({ label, name, options }: { label: string, name: string, options: (string | null)[] }) {
    const { currentValue, sortedOptions, handleChange } = useFilterSelect(name, options);
    return (
        <Selector label={label} name={name} options={sortedOptions} currentValue={currentValue} handleChange={handleChange} width="w-full" emptyValue />
    );
}
