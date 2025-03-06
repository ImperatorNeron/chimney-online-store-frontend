const InputField: React.FC<InputFieldProps> = ({
    id,
    type = "text",
    placeholder,
    className = "",
    ...props
}) => {
    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-md ${className}`}
            {...props}
        />
    );
};

export default InputField;