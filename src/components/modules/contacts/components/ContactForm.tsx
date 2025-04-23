"use client";
import ConfirmButton from "@/components/ui/ConfirmButton";
import TextareaField from "@/components/ui/Textarea";
import useContactForm from "@/components/modules/contacts/hooks/useContactForm";
import FormField from "@/components/shared/FormField";
import { ChatBubbleLeftIcon, IdentificationIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState,
        onSubmit,
        userNameHandlers,
        phoneNumberHandlers,
        isLoading
    } = useContactForm();

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
                    onKeyPress={userNameHandlers.onKeyPress}
                    onPaste={userNameHandlers.onPaste}
                    icon={IdentificationIcon}
                />
                <FormField
                    id="phone_number"
                    label="Номер телефону"
                    required
                    placeholder="0991234567"
                    errorMessage={formState.errors.phone_number?.message}
                    {...register("phone_number")}
                    onKeyPress={phoneNumberHandlers.onKeyPress}
                    onPaste={phoneNumberHandlers.onPaste}
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
                    icon={ChatBubbleLeftIcon}
                />
                <ConfirmButton label="Надіслати" isLoading={isLoading} />
            </form>
        </div>

    );
}
