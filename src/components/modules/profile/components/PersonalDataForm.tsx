'use client';

import { EnvelopeIcon, PhoneIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import FormField from '@/components/shared/FormField';
import ConfirmButton from '@/components/ui/ConfirmButton';
import { usePersonalDataForm } from '../hooks/usePersonalDataForm';


export default function PersonalDataForm({ user }: PersonalDataFormProps) {
    const { formData, isLoading, handleChange, handleSubmit } = usePersonalDataForm(user);

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-0">
            <h1 className="text-2xl font-semibold text-center mb-6 border-b pb-3">
                Персональні дані
            </h1>
            <div className="space-y-5">
                <FormField
                    id="firstName"
                    label="Ім'я"
                    required={false}
                    placeholder="Анатолій"
                    defaultValue={formData.firstName}
                    icon={IdentificationIcon}
                    onChange={handleChange("firstName")}
                />
                <FormField
                    id="lastName"
                    label="Прізвище"
                    required={false}
                    placeholder="Куліш"
                    defaultValue={formData.lastName}
                    icon={IdentificationIcon}
                    onChange={handleChange("lastName")}
                />
                <FormField
                    id="patronymic"
                    label="По батькові"
                    required={false}
                    placeholder="Сергійович"
                    defaultValue={formData.patronymic}
                    icon={IdentificationIcon}
                    onChange={handleChange("patronymic")}
                />
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    required={false}
                    placeholder="youremail@gmail.com"
                    defaultValue={formData.email}
                    icon={EnvelopeIcon}
                    onChange={handleChange("email")}
                />
                <FormField
                    id="phone"
                    label="Номер телефону"
                    type="tel"
                    required={false}
                    placeholder="+380 XX XXX XX XX"
                    defaultValue={formData.phone}
                    icon={PhoneIcon}
                    onChange={handleChange("phone")}
                />

                <ConfirmButton label="Зберегти зміни" isLoading={isLoading} />
            </div>
        </form>
    );
}