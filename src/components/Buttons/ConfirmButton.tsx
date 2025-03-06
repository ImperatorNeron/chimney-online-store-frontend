import React from 'react';

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick, label, icon, isLoading }) => {

    return (
        <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-300 flex items-center justify-center"
            onClick={onClick}
            disabled={isLoading}
        >
            {icon && <span className="mr-2 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>}
            {isLoading ? "Завантаження" : label}
        </button>
    );
};

export default ConfirmButton;