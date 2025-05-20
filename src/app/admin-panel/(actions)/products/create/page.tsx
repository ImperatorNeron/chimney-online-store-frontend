"use client";

import useCategories from "@/components/modules/admin/hooks/products/useCategories";
import { useProductForm } from "@/components/modules/admin/hooks/products/useCreateUniqueProductForm";
import SectionContainer from "@/components/modules/checkout/components/SectionContainer";
import FormField from "@/components/shared/FormField";
import FormSelect from "@/components/shared/FormSelect";
import BackToPageButton from "@/components/ui/BackToPageButton";
import ConfirmButton from "@/components/ui/ConfirmButton";
import TextareaField from "@/components/ui/Textarea";
import { inputPatterns } from "@/utils/field.patterns";
import { IdentificationIcon, ClipboardDocumentIcon, TruckIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function ProductCreatePage() {
    const { register, handleSubmit, errors, isSubmitting, onSubmit } = useProductForm();
    const categories = useCategories();
    const categoryOptions = Array.isArray(categories?.data)
        ? categories.data.map((cat) => ({
            value: String(cat.id),
            label: cat.name,
        }))
        : [];

    return (
        <SectionContainer>
            <BackToPageButton href="/admin-panel/products" title="Повернутися до продуктів"/>
            <h1 className="text-2xl font-semibold mb-8">Додати новий продукт</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                    id="name"
                    label="Назва товару"
                    required
                    placeholder="Наприклад, Труба зі сталі"
                    errorMessage={errors.name?.message}
                    {...register("name")}
                    icon={IdentificationIcon}
                    pattern={inputPatterns.message}
                />
                <FormField
                    id="slug"
                    label="Slug"
                    required
                    placeholder="truba-zi-stali"
                    errorMessage={errors.slug?.message}
                    {...register("slug")}
                    icon={ClipboardDocumentIcon}
                    pattern={inputPatterns.message}
                />
                <FormField
                    id="description"
                    component={TextareaField}
                    label="Опис продукту"
                    required
                    placeholder="Детальний опис продукту..."
                    errorMessage={errors.description?.message}
                    {...register("description")}
                    icon={ClipboardDocumentIcon}
                    pattern={inputPatterns.message}
                />
                <FormSelect
                    id="category_id"
                    register={register("category_id", { valueAsNumber: true })}
                    icon={TruckIcon}
                    options={categoryOptions}
                />
                <div className="flex flex-col">
                    <label htmlFor="photos" className="mb-1 font-medium text-gray-700">
                        Фото (jpg, jpeg, png, webp) — можна декілька
                    </label>
                    <input
                        id="photos"
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.webp"
                        {...register("images")}
                        className="border rounded-md p-2 focus:outline-none focus:ring"
                    />
                    {errors.images && (
                        <p className="mt-1 text-sm text-red-600">{errors.images.message as string}</p>
                    )}
                </div>
                <ConfirmButton
                    label='Створити продукт'
                    isLoading={isSubmitting}
                    icon={<ArrowLeftEndOnRectangleIcon className='h-5 w-5' />}
                />
            </form>
        </SectionContainer>
    );
}
