'use client';

import { EnvelopeIcon, PhoneIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import FormField from '@/components/shared/FormField';
import ConfirmButton from '@/components/ui/ConfirmButton';
import { usePersonalDataForm } from '../hooks/usePersonalDataForm';


export default function PersonalDataForm({ user }: { user: User; }) {
    const { register, handleSubmit, errors, isSubmitting } = usePersonalDataForm(user);

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-0">
            <h1 className="text-2xl font-semibold text-center mb-6 border-b pb-3">
                Персональні дані
            </h1>
            <div className="space-y-5">
                <FormField
                    id="first_name"
                    label="Ім'я"
                    required={false}
                    placeholder="Анатолій"
                    errorMessage={errors.first_name?.message}
                    icon={IdentificationIcon}
                    {...register("first_name")}
                />
                <FormField
                    id="last_name"
                    label="Прізвище"
                    required={false}
                    placeholder="Куліш"
                    errorMessage={errors.last_name?.message}
                    icon={IdentificationIcon}
                    {...register("last_name")}
                />
                <FormField
                    id="patronymic"
                    label="По батькові"
                    required={false}
                    placeholder="Сергійович"
                    errorMessage={errors.patronymic?.message}
                    icon={IdentificationIcon}
                    {...register("patronymic")}
                />
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    required={false}
                    placeholder="youremail@gmail.com"
                    errorMessage={errors.email?.message}
                    icon={EnvelopeIcon}
                    {...register("email")}
                />
                <FormField
                    id="phone_number"
                    label="Номер телефону"
                    type="tel"
                    required={false}
                    placeholder="+380 XX XXX XX XX"
                    errorMessage={errors.phone_number?.message}
                    icon={PhoneIcon}
                    {...register("phone_number")}
                />

                <ConfirmButton label="Зберегти зміни" isLoading={isSubmitting} />
            </div>
        </form>
    );
}