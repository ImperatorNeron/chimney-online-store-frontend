'use client'

import ConfirmButton from '@/components/ui/ConfirmButton';
import FormField from '@/components/shared/FormField';
import { ArrowLeftEndOnRectangleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { UserIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {

    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(username, password);
            router.push('/profile');
        } catch (err) {
            setError('Помилка авторизації');
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">{error}</div>}

            <FormField
                id="username"
                label="Логін"
                required
                placeholder="Customer"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
                icon={UserIcon}
            />

            <FormField
                id="password"
                type="password"
                label="Пароль"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                icon={LockClosedIcon}
            />

            <ConfirmButton
                label='Увійти'
                icon={<ArrowLeftEndOnRectangleIcon className='h-5 w-5' />}
            />
        </form>
    );
};