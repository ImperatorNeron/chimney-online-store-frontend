import { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function EditableCell({
    value,
    onSave,
    placeholder = "",
    disabled = false,
    sanitize,
    maxLength,
}: {
    value: string | number;
    onSave: (val: string) => void;
    placeholder?: string;
    disabled?: boolean;
    sanitize?: (val: string) => string;
    maxLength?: number;
}) {
    const [localValue, setLocalValue] = useState(String(value ?? ""));
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setLocalValue(String(value ?? ""));
        setIsDirty(false);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value;
        if (sanitize) v = sanitize(v);
        if (maxLength) v = v.slice(0, maxLength);
        setLocalValue(v);
        setIsDirty(true);
    };

    const handleSave = () => {
        onSave(localValue);
        setIsDirty(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSave();
    };

    return (
        <div className="flex items-center gap-1">
            <input
                type="text"
                className="h-7 w-full text-xs border border-gray-300 rounded bg-white px-1 py-0 focus:outline-none focus:ring-1 focus:ring-blue-200"
                value={localValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                placeholder={placeholder}
                maxLength={maxLength}
            />
            {isDirty && (
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={disabled}
                    className="p-0.5 text-green-600 hover:bg-green-50 rounded shrink-0"
                >
                    <CheckIcon className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
