import FieldErrorMessage from "@/components/ui/FieldError";
import SectionContainer from "./SectionContainer";
import FormSelect from "@/components/shared/FormSelect";
import Label from "@/components/ui/Label";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { PAYMENT_METHODS } from "@/constants/orders";

export default function PaymentMethodSectionSelect({ errors, register }: { errors: any; register: any; }) {

    const paymentOptions = Object.entries(PAYMENT_METHODS).map(([value, label]) => ({ value, label }));

    return (
        <SectionContainer>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Спосіб оплати</h2>
            <Label label={"Оберіть спосіб оплати"} htmlFor={"payment_method"} required />
            <FormSelect
                id="payment_method"
                register={register("payment_method")}
                icon={CreditCardIcon}
                options={paymentOptions}
            />
            {errors.payment_method && (
                <FieldErrorMessage message={errors.payment_method.message} />
            )}
        </SectionContainer>
    );
}
