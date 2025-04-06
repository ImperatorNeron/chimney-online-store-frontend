import FormField from "@/components/InputFields/FormInputField";
import SectionContainer from "./SectionContainer";

export default function ContactInfoSection() {
    return (
        <SectionContainer>
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Контактні дані</h2>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField id="name" label="Ім'я" required placeholder="Анатолій" />
                    <FormField id="surname" label="Прізвище" required placeholder="Куліш" />
                    <FormField id="middlename" label="По батькові" required placeholder="Сергійович" />
                </div>
                <FormField id="phone" label="Номер телефону" type="tel" required placeholder="+380 XX XXX XX XX" />
                <FormField id="email" label="Email" type="email" placeholder="youremail@gmail.com" />
            </form>
        </SectionContainer>
    )
};