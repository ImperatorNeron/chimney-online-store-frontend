'use client'

import ConfirmButton from '@/components/ui/ConfirmButton';
import FormField from '@/components/shared/FormField';
import { EnvelopeIcon, IdentificationIcon, LockClosedIcon, PhoneIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import useRegisterForm from '../hook/useRegistrationForm';

export default function RegistrationForm() {
    const { register, handleSubmit, formState, onSubmit, isLoading } = useRegisterForm();

    return (
        <div>
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-900">Основна інформація</h2>
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <FormField
                            id="first_name"
                            label="Ім'я"
                            {...register('first_name')}
                            error={formState.errors.first_name?.message}
                            placeholder="Введіть ваше ім'я"
                            className="input-primary"
                            icon={IdentificationIcon}
                        />

                        <FormField
                            id="last_name"
                            label="Прізвище"
                            {...register('last_name')}
                            error={formState.errors.last_name?.message}
                            placeholder="Введіть ваше прізвище"
                            className="input-primary"
                            icon={IdentificationIcon}
                        />

                        <FormField
                            id="patronymic"
                            label="Прізвище"
                            {...register('patronymic')}
                            error={formState.errors.patronymic?.message}
                            placeholder="Введіть по батькові"
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
                        {...register('username')}
                        error={formState.errors.username?.message}
                        placeholder="Придумайте логін"
                        className="input-primary"
                        icon={UserIcon}
                    />

                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <FormField
                            id="email"
                            type="email"
                            label="Email"
                            {...register('email')}
                            error={formState.errors.email?.message}
                            placeholder="example@mail.com"
                            className="input-primary"
                            icon={EnvelopeIcon}
                        />

                        <FormField
                            id="phone_number"
                            type="tel"
                            label="Телефон"
                            {...register('phone_number')}
                            error={formState.errors.phone_number?.message}
                            placeholder="+380123456789"
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
                            {...register('password')}
                            error={formState.errors.password?.message}
                            placeholder="••••••••"
                            className="input-primary"
                            icon={LockClosedIcon}
                        />

                        <FormField
                            id="confirm_password"
                            type="password"
                            label="Підтвердження паролю"
                            required
                            {...register('confirm_password')}
                            error={formState.errors.confirm_password?.message}
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
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </div>
    );
}