import Link from 'next/link';
import ContactInfo from './ContactInfo';
import QuickLinks from './QuickLinks';
import SocialLinks from './SocialLinks';
import { contactItems, quickLinks, socialLinks } from './constants';

export default function Footer() {
    return (
        <footer className="bg-black text-gray-300 py-10 mt-6">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Link href="/" className="text-2xl font-bold text-white">
                            Димок
                        </Link>
                        <p className="mt-2 text-gray-400">
                            Найкращі товари для вашого комфорту. Дізнайтеся більше про нас!
                        </p>
                        <div className="mt-4">
                            <h3 className="text-white font-semibold mb-2">Ми в соцмережах</h3>
                            <SocialLinks links={socialLinks} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-3">Швидкі посилання</h3>
                        <QuickLinks links={quickLinks} />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-3">Контакти</h3>
                        <ContactInfo items={contactItems} />
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Димок. Всі права захищені.</p>
                </div>
            </div>
        </footer>
    );
};