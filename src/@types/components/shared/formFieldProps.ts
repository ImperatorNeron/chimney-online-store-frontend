interface FormFieldProps {
    component?: React.ElementType;
    id: string;
    type?: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    errorMessage?: string;
    className?: string;
    pattern?: RegExp;
    icon: React.ElementType,
    [key: string]: any;
}