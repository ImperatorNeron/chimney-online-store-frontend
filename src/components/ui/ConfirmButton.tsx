import React from 'react';

interface ConfirmButtonProps {
    onClick?: () => void;
    label: string;
    className?: string;
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export default function ConfirmButton({ onClick, label, icon, isLoading, className }: ConfirmButtonProps) {
    return (
        <button
            type="submit"
            className={`w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-300 flex items-center justify-center ${className}`}
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? (
                <div className="h-6 w-6 mx-auto border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                    {icon && <span className="mr-2 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>}
                    {label}
                </>
            )}

        </button>
    );
};
