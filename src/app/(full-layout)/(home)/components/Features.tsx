import { features } from '@/constants/features';
import Image from 'next/image';

export default function FeaturesGrid() {
    return (
        <div className="w-full py-4">
            <div className="px-4 lg:px-10">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center lg:justify-center p-2 gap-4">
                            <Image src={feature.src} alt={feature.alt} width={feature.size} height={feature.size} />
                            <div>
                                <h3 className="text-base font-semibold leading-tight">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-tight">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
