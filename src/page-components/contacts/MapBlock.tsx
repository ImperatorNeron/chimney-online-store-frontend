import React from 'react';

const MapBlock: React.FC = () => {
    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-black mb-4 text-center">
                Ми на карті
            </h3>
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <iframe
                    title="Карта"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25377.95550749884!2d30.450263!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5d63d1c6f3%3A0x3f6f3b8a8a0a3f!2z0JrQuNC80LjRjyDRgtGA0LXQu9GM0YLRgNC40Y8!5e0!3m2!1suk!2sua!4v1680943177663!5m2!1suk!2sua"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default MapBlock;