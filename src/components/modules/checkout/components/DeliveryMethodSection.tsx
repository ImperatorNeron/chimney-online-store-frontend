import SectionContainer from "./SectionContainer";
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/outline";
import FormField from "@/components/shared/FormField";
import FieldErrorMessage from "@/components/ui/FieldError";
import Label from "@/components/ui/Label";
import FormSelect from "@/components/shared/FormSelect";
import { inputPatterns } from "@/utils/field.patterns";

export default function DeliveryMethodSection({ errors, register }: { errors: any; register: any; }) {

    return (
        <SectionContainer>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Спосіб доставки</h2>
            <div className="mb-4">
                <Label label={"Оберіть спосіб доставки"} htmlFor={"shipping_method"} required />
                <FormSelect
                    id="shipping_method"
                    register={register("shipping_method")}
                    icon={TruckIcon}
                    options={[
                        { value: "nova_poshta", label: "Нова Пошта" },
                        { value: "ukrposhta", label: "Укрпошта" },
                        { value: "courier", label: "Доставка по Волині" }
                    ]}
                />
                {errors.shipping_method && (
                    <FieldErrorMessage message={errors.shipping_method.message} />
                )}
            </div>

            <FormField
                id="address"
                label="Адреса доставки"
                placeholder="Твоя адреса"
                required
                icon={MapPinIcon}
                errorMessage={errors.address?.message}
                pattern={inputPatterns.address}
                {...register("address")}
            />
        </SectionContainer>
    );
}
