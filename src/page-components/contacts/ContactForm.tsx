"use client";
import ConfirmButton from "@/components/Buttons/ConfirmButton";
import TextareaField from "@/components/InputFields/Textarea";
import VALIDATORS from "./constants/validators";
import useContactForm from "@/hooks/forms/useContactForm";
import useInputHandlers from "@/hooks/forms/useInputHandlers";
import FormField from "@/components/InputFields/FormInputField";

const ContactForm = () => {
    const { register, handleSubmit, formState, onSubmit, isLoading } = useContactForm();
    const userNameHandlers = useInputHandlers(/^[A-Za-zА-Яа-яІіЇїЄє'’`\-\s]+$/);
    const phoneNumberHandlers = useInputHandlers(/^\d+$/);

    return (
        <div>
            <form className="space-y-4 flex-2" onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    id="name"
                    label="Ім'я"
                    required
                    placeholder="Микола"
                    errorMessage={formState.errors.user_name?.message}
                    {...register("user_name", VALIDATORS.NAME)}
                    onKeyPress={userNameHandlers.onKeyPress}
                    onPaste={userNameHandlers.onPaste}
                />
                <FormField
                    id="contact"
                    label="Номер телефону"
                    required
                    placeholder="0991234567"
                    errorMessage={formState.errors.phone_number?.message}
                    {...register("phone_number", VALIDATORS.PHONE)}
                    onKeyPress={phoneNumberHandlers.onKeyPress}
                    onPaste={phoneNumberHandlers.onPaste}
                />
                <FormField
                    component={TextareaField}
                    id="message"
                    label="Повідомлення"
                    placeholder="Ваше повідомлення"
                    errorMessage={formState.errors.message?.message}
                    {...register("message", VALIDATORS.MESSAGE)}
                    rows={4}
                />
                <ConfirmButton label="Надіслати" isLoading={isLoading} />
            </form>
        </div>

    );
}

export default ContactForm;