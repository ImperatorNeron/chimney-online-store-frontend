import { FC } from 'react'
import LoginForm from '@/page-components/auth/login/Form'

const LoginPage: FC = () => {
    return (
        <div className='flex items-center justify-center py-8'>
            <div className="bg-white text-gray-900 rounded-xl shadow-xl w-full max-w-md p-8 border border-gray-300">
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
            </div>
        </div>

    )
}

export default LoginPage
