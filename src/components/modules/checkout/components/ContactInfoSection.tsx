'use client'

import FormField from "@/components/shared/FormField";
import SectionContainer from "./SectionContainer";
import useUserData from "@/components/modules/profile/hooks/useUserData";
import { EnvelopeIcon, IdentificationIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function ContactInfoSection() {
    const { user, loading, error } = useUserData(false);

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
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        id="firstName"
                        label="Ім'я"
                        required
                        placeholder="Анатолій"
                        defaultValue={user?.first_name || ''}
                        icon={IdentificationIcon}
                    />
                    <FormField
                        id="lastName"
                        label="Прізвище"
                        required
                        placeholder="Куліш"
                        defaultValue={user?.last_name || ''}
                        icon={IdentificationIcon}
                    />
                    <FormField
                        id="middlename"
                        label="По батькові"
                        required
                        placeholder="Сергійович"
                        defaultValue={user?.patronymic || ''}
                        icon={IdentificationIcon}
                    />
                </div>
                <FormField
                    id="phone"
                    label="Номер телефону"
                    type="tel"
                    required
                    placeholder="+380 XX XXX XX XX"
                    defaultValue={user?.phone_number || ''}
                    icon={PhoneIcon}
                />
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="youremail@gmail.com"
                    defaultValue={user?.email || ''}
                    icon={EnvelopeIcon}
                />
            </form>
        </SectionContainer>
    )
};