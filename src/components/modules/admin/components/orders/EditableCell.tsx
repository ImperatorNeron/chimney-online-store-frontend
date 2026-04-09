import { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function EditableCell({
    value,
    onSave,
    placeholder = "",
    disabled = false,
}: {
    value: string | number;
    onSave: (val: string) => void;
    placeholder?: string;
    disabled?: boolean;
}) {
    const [localValue, setLocalValue] = useState(String(value ?? ""));
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setLocalValue(String(value ?? ""));
        setIsDirty(false);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
        setIsDirty(true);
    };

    const handleSave = () => {
        onSave(localValue);
        setIsDirty(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

    return (
        <div className="flex items-center gap-1">
            <input
                type="text"
                className="h-7 w-20 text-xs border border-gray-300 rounded bg-white px-1 py-0 focus:outline-none focus:ring-1 focus:ring-blue-200"
                value={localValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                placeholder={placeholder}
            />
            {isDirty && (
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={disabled}
                    className="p-0.5 text-green-600 hover:bg-green-50 rounded"
                >
                    <CheckIcon className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}