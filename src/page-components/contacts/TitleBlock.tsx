import React from 'react';

const TitleBlock: React.FC = () => {
    return (
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                Зв'яжіться з нами
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
                Маєте питання чи пропозиції? Заповніть форму або скористайтесь контактами нижче.
            </p>
        </div>
    );
};

export default TitleBlock;