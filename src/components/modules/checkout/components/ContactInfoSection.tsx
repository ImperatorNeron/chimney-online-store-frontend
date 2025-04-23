'use client'

import FormField from "@/components/shared/FormField";
import SectionContainer from "./SectionContainer";
import { EnvelopeIcon, IdentificationIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { inputPatterns } from "@/utils/field.patterns";

export default function ContactInfoSection({ errors, register, user, loading, error }: { errors: any; register: any; user: any; loading: any; error: any }) {

    if (loading) {
        return (
            <SectionContainer>
                <div>loading</div>
            </SectionContainer>
        )
    }

    if (error) {
        return (
            <SectionContainer>
                <div className="text-red-500">{error}</div>
            </SectionContainer>
        )
    }

    return (
        <SectionContainer>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Контактні дані</h2>
            <div className="flex flex-col gap-4">
                <FormField
                    id="first_name"
                    label="Ім'я"
                    required
                    placeholder="Анатолій"
                    errorMessage={errors.first_name?.message}
                    defaultValue={user?.first_name || ''}
                    icon={IdentificationIcon}
                    pattern={inputPatterns.name}
                    {...register("first_name")}
                />
                <FormField
                    id="last_name"
                    label="Прізвище"
                    required
                    placeholder="Куліш"
                    errorMessage={errors.last_name?.message}
                    defaultValue={user?.last_name || ''}
                    icon={IdentificationIcon}
                    pattern={inputPatterns.name}
                    {...register("last_name")}
                />
                <FormField
                    id="patronymic"
                    label="По батькові"
                    required
                    placeholder="Сергійович"
                    errorMessage={errors.patronymic?.message}
                    defaultValue={user?.patronymic || ''}
                    icon={IdentificationIcon}
                    pattern={inputPatterns.name}
                    {...register("patronymic")}
                />
                <FormField
                    id="phone_number"
                    label="Номер телефону"
                    type="tel"
                    required
                    placeholder="+380 XX XXX XX XX"
                    errorMessage={errors.phone_number?.message}
                    defaultValue={user?.phone_number || ''}
                    icon={PhoneIcon}
                    pattern={inputPatterns.phone}
                    {...register("phone_number")}
                />
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="youremail@gmail.com"
                    errorMessage={errors.email?.message}
                    defaultValue={user?.email || ''}
                    icon={EnvelopeIcon}
                    pattern={inputPatterns.email}
                    {...register("email")}
                />
            </div>
        </SectionContainer>
    )
};