import React from 'react';
import InputField from './Input';
import Label from './Label';
import ErrorMessage from '@/components/InputFields/Error';

const FormField: React.FC<FormFieldProps> = ({
    component: Component = InputField,
    id,
    type = 'text',
    label,
    required = false,
    placeholder,
    errorMessage,
    className = '',
    ...props
}) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <Label label={label} htmlFor={id} required={required} />
            <Component
                id={id}
                placeholder={placeholder}
                type={type}
                {...props}
            />
            {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
    );
};

export default FormField;