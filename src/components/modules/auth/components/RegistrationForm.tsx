'use client'

import ConfirmButton from '@/components/ui/ConfirmButton';
import FormField from '@/components/shared/FormField';
import { EnvelopeIcon, IdentificationIcon, LockClosedIcon, PhoneIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import useRegisterForm from '../hook/useRegistrationForm';
import { inputPatterns } from '@/utils/field.patterns';

export default function RegistrationForm() {
    const { register, handleSubmit, formState, onSubmit } = useRegisterForm();

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

                        <FormField
                            id="patronymic"
                            label="Прізвище"
                            {...register('patronymic')}
                            errorMessage={formState.errors.patronymic?.message}
                            placeholder="Введіть по батькові"
                            pattern={inputPatterns.name}
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
                        errorMessage={formState.errors.username?.message}
                        placeholder="Придумайте логін"
                        pattern={inputPatterns.username}
                        icon={UserIcon}
                    />

                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
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
                    </div>

                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <FormField
                            id="password"
                            type="password"
                            label="Пароль"
                            required
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
                            required
                            {...register('confirm_password')}
                            errorMessage={formState.errors.confirm_password?.message}
                            placeholder="••••••••"
                            pattern={inputPatterns.password}
                            icon={LockClosedIcon}
                        />
                    </div>
                </div>

                <div className="mt-10">
                    <ConfirmButton
                        label='Зареєструватися'
                        icon={<UserPlusIcon className='h-5 w-5' />}
                        isLoading={formState.isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
}