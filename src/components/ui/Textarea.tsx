export default function TextareaField({ id, placeholder, className = "", ...props }: InputFieldProps) {
    return (
        <textarea
            id={id}
            placeholder={placeholder}
            className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-md ${className}`}
            {...props}
        />
    );
};

