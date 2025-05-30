import Overlay from "@/components/ui/Overlay";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ContactForm from "./ContactForm";
import OverlayHeader from "@/components/shared/OverlayHeader";

export default function FeedBackFormOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <Overlay isOpen={isOpen} onClose={onClose} className='w-full sm:w-full lg:w-full'>
            <div className="flex flex-col md:flex-row h-full bg-white overflow-hidden">
                <div className="md:w-2/3 lg:w-1/2 mx-auto h-full">
                    <OverlayHeader title="" onClose={onClose} className="bg-white" />
                    <div className="h-[calc(100%-64px)] overflow-y-auto">
                        <div className="flex flex-col gap-4 justify-center px-6 lg:px-16">
                            <h2 className="text-2xl lg:text-3xl text-center font-bold text-gray-900 mt-8">Зв’яжіться з нами</h2>
                            <p className="text-sm lg:text-base max-w-md mx-auto text-center text-gray-600 mb-4">
                                Ми завжди на зв’язку та готові допомогти. Залиште свої контакти, і наш фахівець відповість вам протягом 24 годин.
                            </p>
                            <ContactForm onClose={onClose} />
                        </div>

                        <div className="my-6 space-y-4 px-6 lg:px-16">
                            <div className="flex items-center gap-2 text-gray-500">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="text-sm">Або</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-center">
                                <Link href="tel:+380441234567" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                                    <PhoneIcon className="h-5 w-5" />
                                    <span className="text-sm lg:text-base">+38 (044) 123 45 67</span>
                                </Link>

                                <Link href="mailto:support@example.com" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                                    <EnvelopeIcon className="h-5 w-5" />
                                    <span className="text-sm lg:text-base">support@example.com</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Overlay >
    )
}