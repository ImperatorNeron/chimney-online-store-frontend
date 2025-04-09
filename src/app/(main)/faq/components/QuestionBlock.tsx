import useToggleListItem from "@/hooks/useToggleFAQItem";

export default function QuestionBlock({ index, item }: QuestionBlockProps) {
    const { activeIndices, toggleItem } = useToggleListItem();

    return (
        <div
            key={index}
            className="bg-gray-50 rounded-xl md:rounded-2xl shadow-md md:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200"
        >
            <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
                <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                    {item.question}
                </span>
                <span className={`transform transition-transform ${activeIndices.includes(index) ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden 
        ${activeIndices.includes(index) ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 border-t border-gray-200 bg-gray-100">
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 md:mb-8 leading-relaxed pt-4 sm:pt-6">
                        {item.answer}
                    </p>
                    {item.videoId && (
                        <div className="aspect-w-16 aspect-h-9 w-full">
                            <iframe
                                src={`https://www.youtube.com/embed/${item.videoId}`}
                                className="w-full h-[200px] sm:h-[300px] md:h-[500px] rounded-lg shadow-md transition-opacity duration-300"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
