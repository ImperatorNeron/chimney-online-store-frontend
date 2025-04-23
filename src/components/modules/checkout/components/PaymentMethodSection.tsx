import FieldErrorMessage from "@/components/ui/FieldError";
import SectionContainer from "./SectionContainer";
import FormSelect from "@/components/shared/FormSelect";
import Label from "@/components/ui/Label";
import { CreditCardIcon } from "@heroicons/react/24/outline";

export default function PaymentMethodSectionSelect({ errors, register }: { errors: any; register: any; }) {

    return (
        <SectionContainer>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Спосіб оплати</h2>
            <Label label={"Оберіть спосіб оплати"} htmlFor={"payment_method"} required />
            <FormSelect
                id="payment_method"
                register={register("payment_method")}
                icon={CreditCardIcon}
                options={[
                    { value: "cash", label: "Оплата при отриманні" },
                    { value: "card", label: "Оплатити зараз (LiqPay)" },
                    { value: "online", label: "Оплата на карту" }
                ]}
            />
            {errors.payment_method && (
                <FieldErrorMessage message={errors.payment_method.message} />
            )}
        </SectionContainer>
    );
}
