"use client";
import React from 'react';

interface CheckboxProps {
    label: string;
    checked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false }) => {
    const [isChecked, setIsChecked] = React.useState(checked);
    return (
        <div className="flex items-center">
            <input
                id="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="h-4 w-4 text-gray-900 border-gray-300 rounded focus:ring-gray-400"
            />
            <label htmlFor="checkbox" className="ml-2 text-sm text-gray-700">
                {label}
            </label>
        </div>
    );
};

export default Checkbox;