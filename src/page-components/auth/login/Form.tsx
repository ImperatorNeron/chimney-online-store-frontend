import ConfirmButton from '@/components/Buttons/ConfirmButton';
import Checkbox from '@/components/InputFields/Checkbox';
import FormField from '@/components/InputFields/FormInputField';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import React from 'react';

const LoginForm: React.FC = () => {
    return (
        <form className="space-y-6">
            <FormField
                id="username"
                label="Логін"
                required
                placeholder="Customer"
            />
            <FormField
                id="password"
                type='password'
                label="Пароль"
                required
                placeholder="••••••••"
            />
            <div className="flex items-center justify-between">
                <Checkbox label='Запам&apos;ятати мене' />
                <a href="#" className="text-sm text-gray-600 hover:underline">
                    Забули пароль?
                </a>
            </div>
            <ConfirmButton label='Увійти' icon={<ArrowLeftEndOnRectangleIcon className='h-5 w-5' />} />
        </form>
    );
};

export default LoginForm;