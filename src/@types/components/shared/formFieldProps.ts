interface FormFieldProps {
    component?: React.ElementType;
    id: string;
    type?: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    errorMessage?: string;
    className?: string;
    [key: string]: any;
}