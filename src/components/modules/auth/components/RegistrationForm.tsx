'use client'

import ConfirmButton from '@/components/ui/ConfirmButton';
import FormField from '@/components/shared/FormField';
import { EnvelopeIcon, IdentificationIcon, LockClosedIcon, PhoneIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';

export default function RegistrationForm() {
    return (
        <div >
            <form className="space-y-8">
                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-900">Основна інформація</h2>

                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <FormField
                            id="firstName"
                            label="Ім'я"
                            placeholder="Введіть ваше ім'я"
                            required={false}
                            className="input-primary"
                            icon={IdentificationIcon}
                        />

                        <FormField
                            id="lastName"
                            label="Прізвище"
                            placeholder="Введіть ваше прізвище"
                            required={false}
                            className="input-primary"
                            icon={IdentificationIcon}
                        />
                    </div>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-900">Облікові дані</h2>

                    <FormField
                        id="username"
                        label="Логін"
                        required
                        placeholder="Придумайте логін"
                        className="input-primary"
                        icon={UserIcon}
                    />

                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <FormField
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="example@mail.com"
                            required={false}
                            className="input-primary"
                            icon={EnvelopeIcon}
                        />

                        <FormField
                            id="phone"
                            type="tel"
                            label="Телефон"
                            placeholder="+380123456789"
                            required={false}
                            className="input-primary"
                            icon={PhoneIcon}
                        />
                    </div>

                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <FormField
                            id="password"
                            type="password"
                            label="Пароль"
                            required
                            placeholder="••••••••"
                            className="input-primary"
                            icon={LockClosedIcon}
                        />

                        <FormField
                            id="confirmPassword"
                            type="password"
                            label="Підтвердження паролю"
                            required
                            placeholder="••••••••"
                            className="input-primary"
                            icon={LockClosedIcon}
                        />
                    </div>
                </div>

                <div className="mt-10">
                    <ConfirmButton
                        label='Зареєструватися'
                        icon={<UserPlusIcon className='h-5 w-5' />}
                    />
                </div>
            </form>
        </div>
    );
};