import FormField from "@/components/shared/FormField";
import SectionContainer from "./SectionContainer";
import RadioOption from "@/components/shared/RadioOption";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function DeliveryMethodSection({
    deliveryMethod,
    setDeliveryMethod,
}: {
    deliveryMethod: string;
    setDeliveryMethod: (method: string) => void;
}) {
    return (
        <SectionContainer>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Спосіб доставки</h2>
            <div className="space-y-2 mb-6">
                {[
                    { value: 'nova-poshta', label: 'Нова Пошта' },
                    { value: 'ukrposhta', label: 'Укрпошта' },
                    { value: 'volyn-delivery', label: 'Доставка по Волині' },
                ].map((method) => (
                    <RadioOption
                        key={method.value}
                        name="delivery"
                        value={method.value}
                        label={method.label}
                        checked={deliveryMethod === method.value}
                        onChange={setDeliveryMethod}
                    />
                ))}
            </div>
            <FormField id="address" label="Адреса доставки" placeholder="Твоя адреса" icon={MapPinIcon} />
        </SectionContainer>
    )
}
