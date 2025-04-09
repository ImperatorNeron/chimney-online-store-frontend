import React from 'react';
import FieldErrorMessage from '@/components/ui/FieldError';
import InputField from '../ui/Input';
import Label from '../ui/Label';

export default function FormField({
    component: Component = InputField,
    id,
    type = 'text',
    label,
    required = false,
    placeholder,
    errorMessage,
    className = '',
    ...props
}: FormFieldProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            <Label label={label} htmlFor={id} required={required} />
            <Component
                id={id}
                placeholder={placeholder}
                type={type}
                {...props}
            />
            {errorMessage && <FieldErrorMessage message={errorMessage} />}
        </div>
    );
};