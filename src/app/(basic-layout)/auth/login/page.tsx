import LoginForm from '@/components/modules/auth/components/LoginForm'
import Link from 'next/link';

export const metadata = {
    title: 'Вхід до акаунту',
}

export default function LoginPage() {
    return (
        <div className="w-full max-w-md bg-white rounded-xl px-2 py-6 sm:p-10 space-y-8">
            <div className="text-center space-y-2">
                <div className="text-2xl font-semibold text-gray-900">Ласкаво просимо!</div>
                <p className="text-gray-500 text-sm">Увійдіть у свій акаунт</p>
            </div>

            <LoginForm />

            <div className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white text-gray-500">Або</span>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <a
                        href="mailto:techsupport@gmail.com"
                        className="text-sm text-gray-600 text-center hover:text-gray-900 transition-colors duration-200 font-medium"
                    >
                        Забули пароль? Зверніться до тех. підтримки techsupport@gmail.com
                    </a>

                    <p className="text-sm text-gray-500">
                        Ще не маєте акаунта?{' '}
                        <Link
                            href="/auth/registration"
                            className="text-gray-900 hover:text-black font-medium transition-colors duration-200"
                        >
                            Зареєструватися
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};