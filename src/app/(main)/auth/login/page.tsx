import LoginForm from '@/components/modules/auth/components/LoginForm'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export default function LoginPage() {
    return (
        <div>
            <Breadcrumbs items={[
                { title: "Головна", href: "/" },
                { title: "Вхід" }
            ]} />
            <div className='flex items-center justify-center py-8'>
                <div className="text-gray-900 w-full max-w-md p-8 group rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Ласкаво просимо!</h1>
                        <p className="text-gray-600">Увійдіть у свій акаунт</p>
                    </div>
                    <LoginForm />
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Ще не маєте акаунта?{' '}
                        <a href="#" className="text-gray-900 hover:underline font-medium">
                            Зареєструватися
                        </a>
                    </p>
                    <div className="border-t border-gray-300 my-4 mx-12"></div>
                    <div className="flex items-center justify-center">
                        <a href="#" className="text-sm text-gray-600 underline hover:text-gray-800">
                            Забули пароль?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
