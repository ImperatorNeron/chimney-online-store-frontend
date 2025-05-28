'use client';

import { EnvelopeIcon, PhoneIcon, IdentificationIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import FormField from '@/components/shared/FormField';
import ConfirmButton from '@/components/ui/ConfirmButton';
import { usePersonalDataForm } from '../hooks/usePersonalDataForm';
import { inputPatterns } from '@/utils/field.patterns';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { NotificationService } from '@/api/services/notification.service';
import Link from 'next/link';
import { useState } from 'react';
import { useFavouritesStore } from '@/store/favourite.store';
import { UserSchema } from '@/api/types/types';

export default function PersonalDataForm({ user }: { user: UserSchema }) {
    const { resetLikes } = useFavouritesStore();
    const logout = useAuthStore((state) => state.logout);
    const { register, handleSubmit, formState, onSubmit } = usePersonalDataForm(user);
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        if (isLoggingOut) return;

        setIsLoggingOut(true);

        try {
            await logout();
            resetLikes();
            NotificationService.success('Ви вийшли з профілю!');
            router.push('/auth/login');
        } catch {
            NotificationService.error('Сталася помилка при виході');
        }

        setTimeout(() => {
            setIsLoggingOut(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen text-gray-900 p-4 flex flex-col">
            <div className="w-full max-w-2xl mx-auto">
                {user.is_superuser && (
                    <div className="mb-6">
                        <Link
                            href="/admin-panel"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200"
                        >
                            <ShieldCheckIcon className="w-5 h-5" />
                            <span className="font-medium">Панель адміністратора</span>
                        </Link>
                    </div>
                )}

                <div className="mb-4 text-center">
                    <h1 className="text-3xl font-semibold mb-1">Персональні дані</h1>
                    <div className="text-sm text-gray-600">
                        Створено: {new Date(user.created_at ?? '').toLocaleDateString('uk-UA')} | Оновлено: {new Date(user.updated_at ?? '').toLocaleDateString('uk-UA')}
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                            id="first_name"
                            label="Ім'я"
                            {...register('first_name')}
                            errorMessage={formState.errors.first_name?.message}
                            placeholder="Введіть ваше ім'я"
                            pattern={inputPatterns.name}
                            icon={IdentificationIcon}
                        />

                        <FormField
                            id="last_name"
                            label="Прізвище"
                            {...register('last_name')}
                            errorMessage={formState.errors.last_name?.message}
                            placeholder="Введіть ваше прізвище"
                            pattern={inputPatterns.name}
                            icon={IdentificationIcon}
                        />
                    </div>

                    <FormField
                        id="patronymic"
                        label="По батькові"
                        {...register('patronymic')}
                        errorMessage={formState.errors.patronymic?.message}
                        placeholder="Введіть по батькові"
                        pattern={inputPatterns.name}
                        icon={IdentificationIcon}
                    />

                    <FormField
                        id="email"
                        type="email"
                        label="Email"
                        {...register('email')}
                        errorMessage={formState.errors.email?.message}
                        placeholder="example@mail.com"
                        pattern={inputPatterns.email}
                        icon={EnvelopeIcon}
                    />

                    <FormField
                        id="phone_number"
                        type="tel"
                        label="Телефон"
                        {...register('phone_number')}
                        errorMessage={formState.errors.phone_number?.message}
                        placeholder="+380123456789"
                        pattern={inputPatterns.phone}
                        icon={PhoneIcon}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                            id="password"
                            type="password"
                            label="Пароль"
                            {...register('password')}
                            errorMessage={formState.errors.password?.message}
                            placeholder="••••••••"
                            pattern={inputPatterns.password}
                            icon={LockClosedIcon}
                        />

                        <FormField
                            id="confirm_password"
                            type="password"
                            label="Підтвердження паролю"
                            {...register('confirm_password')}
                            errorMessage={formState.errors.confirm_password?.message}
                            placeholder="••••••••"
                            pattern={inputPatterns.password}
                            icon={LockClosedIcon}
                        />
                    </div>

                    <div className="flex justify-center">
                        <ConfirmButton label="Зберегти зміни" isLoading={formState.isSubmitting} />
                    </div>
                </form>

                <div className="mt-2 flex justify-center">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="px-4 py-3 w-full border-2 border-black hover:bg-gray-200 text-gray-900 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                        {isLoggingOut ? <div className="h-6 w-6 mx-auto border-2 border-gray-400 border-t-transparent rounded-full animate-spin" /> : 'Вийти'}
                    </button>
                </div>
            </div>
        </div>
    );
}
