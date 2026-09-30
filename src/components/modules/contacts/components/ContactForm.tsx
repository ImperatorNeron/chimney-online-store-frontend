"use client";
import ConfirmButton from "@/components/ui/ConfirmButton";
import TextareaField from "@/components/ui/Textarea";
import useContactForm from "@/components/modules/contacts/hooks/useContactForm";
import FormField from "@/components/shared/FormField";
import { ChatBubbleLeftIcon, IdentificationIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { inputPatterns } from "@/utils/field.patterns";
import { useEffect } from "react";

export default function ContactForm({ onClose }: { onClose?: () => void }) {
    const { register, handleSubmit, formState, onSubmit } = useContactForm();

    useEffect(() => {
        if (formState.isSubmitSuccessful && onClose) {
            onClose();
        }
    }, [formState.isSubmitSuccessful, onClose]);

    return (
        <div>
            <form className="space-y-4 flex-2" onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    id="user_name"
                    label="Ім'я"
                    required
                    placeholder="Микола"
                    errorMessage={formState.errors.user_name?.message}
                    {...register("user_name")}
                    pattern={inputPatterns.name}
                    icon={IdentificationIcon}
                />
                <FormField
                    id="phone_number"
                    label="Номер телефону"
                    required
                    placeholder="0991234567"
                    errorMessage={formState.errors.phone_number?.message}
                    {...register("phone_number")}
                    pattern={inputPatterns.phone}
                    icon={PhoneIcon}
                />
                <FormField
                    component={TextareaField}
                    id="message"
                    label="Повідомлення"
                    placeholder="Ваше повідомлення"
                    errorMessage={formState.errors.message?.message}
                    {...register("message")}
                    rows={4}
                    pattern={inputPatterns.message}
                    icon={ChatBubbleLeftIcon}
                />
                <ConfirmButton label="Надіслати" isLoading={formState.isSubmitting} />
            </form>
        </div>

    );
}
