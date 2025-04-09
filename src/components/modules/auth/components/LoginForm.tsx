import ConfirmButton from '@/components/ui/ConfirmButton';
import FormField from '@/components/shared/FormField';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function LoginForm() {
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
            <ConfirmButton label='Увійти' icon={<ArrowLeftEndOnRectangleIcon className='h-5 w-5' />} />
        </form>
    );
};
