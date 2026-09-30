import React from 'react';
import FieldErrorMessage from '@/components/ui/FieldError';
import InputField from '../ui/Input';
import Label from '../ui/Label';
import useInputHandlers from '@/hooks/forms/useInputHandlers';

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

export default function FormField({
    component: Component = InputField,
    id,
    type = 'text',
    label,
    required = false,
    placeholder,
    errorMessage,
    className = '',
    icon: Icon,
    pattern = /^.*$/,
    ...props
}: FormFieldProps) {
    const handlers = useInputHandlers(pattern);
    return (
        <div className={`flex flex-col ${className}`}>
            <Label label={label} htmlFor={id} required={required} />
            <div className="relative flex-shrink-0">
                <Component
                    id={id}
                    placeholder={placeholder}
                    type={type}
                    className="w-full p-3 pl-[55px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
                    onKeyPress={handlers.onKeyPress}
                    onPaste={handlers.onPaste}
                    required={required}
                    autoCapitalize="none"
                    {...props}
                />
                <Icon className="w-10 h-5 text-gray-400 absolute top-4 left-1 border-r-2" />
            </div>
            {errorMessage && <FieldErrorMessage message={errorMessage} />}
        </div>
    );
};