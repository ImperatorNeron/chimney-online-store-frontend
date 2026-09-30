import RegistrationForm from '@/components/modules/auth/components/RegistrationForm'
import Link from 'next/link';

export const metadata = {
    title: 'Реєстрація',
}

export default function RegistrationPage() {
    return (
        <div className="w-full px-2 py-6 sm:p-10 space-y-8 max-w-3xl">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold text-gray-900">Створення акаунту</h1>
                <p className="text-gray-500 text-sm">Заповніть форму для реєстрації</p>
            </div>

            <RegistrationForm />

            <div className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white text-gray-500">Вже маєте акаунт?</span>
                    </div>
                </div>

                <div className="flex justify-center">

                    <p className="text-sm text-gray-500">
                        Ще не маєте акаунта?{' '}
                        <Link
                            href="/auth/login"
                            className="text-sm text-gray-900 hover:text-black font-medium transition-colors duration-200"
                        >
                            Увійти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};