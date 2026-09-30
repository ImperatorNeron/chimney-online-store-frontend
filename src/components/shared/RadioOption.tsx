interface RadioOptionProps {
    value: string;
    label: string;
    checked: boolean;
    onChange: (value: string) => void;
    name: string;
}

export default function RadioOption({ value, label, checked, onChange, name }: RadioOptionProps) {
    return (
        <label
            className={`flex items-center px-4 py-3 rounded-lg border transition-all cursor-pointer ${checked ? 'border-black bg-gray-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
        >
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={(e) => onChange(e.target.value)}
                className="h-4 w-4 text-black focus:ring-0 border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-800">{label}</span>
        </label>
    )
}