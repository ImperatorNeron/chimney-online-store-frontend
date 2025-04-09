export default function Label({ htmlFor, label, required = false }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1.5 ">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};
