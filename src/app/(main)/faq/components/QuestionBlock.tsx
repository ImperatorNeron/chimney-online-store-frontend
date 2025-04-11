import useToggleListItem from "@/hooks/useToggleFAQItem";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function QuestionBlock({ index, item }: QuestionBlockProps) {
    const { activeIndices, toggleItem } = useToggleListItem();

    return (
        <div className="border-b border-gray-200 last:border-0 transition-colors">
            <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-5 lg:px-8 lg:py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-all"
            >
                <span className="text-base sm:text-lg md:text-xl lg:text-xl font-normal text-gray-900 pr-4">
                    {item.question}
                </span>
                <span className={`shrink-0 transform transition-transform ${activeIndices.includes(index) ? 'rotate-180' : ''
                    }`}>
                    <ChevronDownIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-900" />
                </span>
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden 
                ${activeIndices.includes(index) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pb-4 px-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6 lg:px-8 lg:pb-8">
                    <p className="text-sm sm:text-base md:text-lg lg:text-lg text-gray-600 leading-relaxed sm:leading-loose">
                        {item.answer}
                    </p>
                    {item.videoId && (
                        <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 rounded-lg overflow-hidden">
                            <iframe
                                src={`https://www.youtube.com/embed/${item.videoId}`}
                                className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[600px]"
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