'use client';

import { EnvelopeIcon, PhoneIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import FormField from '@/components/shared/FormField';
import ConfirmButton from '@/components/ui/ConfirmButton';
import { usePersonalDataForm } from '../hooks/usePersonalDataForm';
import { inputPatterns } from '@/utils/field.patterns';


export default function PersonalDataForm({ user }: { user: User; }) {
    const { register, handleSubmit, formState, onSubmit } = usePersonalDataForm(user);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-0">
            <h1 className="text-2xl font-semibold text-center mb-6 border-b pb-3">
                Персональні дані
            </h1>
            <div className="space-y-5">
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

                <ConfirmButton label="Зберегти зміни" isLoading={formState.isSubmitting} />
            </div>
        </form>
    );
}