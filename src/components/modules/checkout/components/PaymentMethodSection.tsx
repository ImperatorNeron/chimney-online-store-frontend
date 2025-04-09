import RadioOption from "@/components/shared/RadioOption";
import SectionContainer from "./SectionContainer";

export default function PaymentMethodSection({
    paymentMethod,
    setPaymentMethod,
}: {
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
}) {
    return (
        <SectionContainer>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Спосіб оплати</h2>
            <div className="space-y-2">
                {[
                    { value: 'cash', label: 'Оплата при отриманні' },
                    { value: 'now', label: 'Оплатити зараз (LiqPay)' },
                    { value: 'card', label: 'Оплата на карту' },
                ].map((method) => (
                    <RadioOption
                        key={method.value}
                        name="payment"
                        value={method.value}
                        label={method.label}
                        checked={paymentMethod === method.value}
                        onChange={setPaymentMethod}
                    />
                ))}
            </div>
        </SectionContainer>
    )

};
