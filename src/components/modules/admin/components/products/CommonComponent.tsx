import { listReadCategorySchema } from "@/api/types/types";
import FormField from "@/components/shared/FormField";
import FormSelect from "@/components/shared/FormSelect";
import BackToPageButton from "@/components/ui/BackToPageButton";
import TextareaField from "@/components/ui/Textarea";
import { inputPatterns } from "@/utils/field.patterns";
import { ArrowLeftEndOnRectangleIcon, IdentificationIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import ConfirmButton from "@/components/ui/ConfirmButton";

type Mode = 'edit' | 'create';

export default function ProductActionComponent({ categories, form, mode }: { categories: listReadCategorySchema, form: any, mode: Mode }) {
    const categoryOptions = (categories || [])
        .filter(c => c.parent_id !== null)
        .map(c => ({ value: String(c.id), label: c.name }));

    return (
        <div className="px-4 py-8 bg-white min-h-screen">
            <div className=" mx-auto space-y-8">
                <BackToPageButton href="/admin-panel/products" title="Назад до списку" />

                <div className="bg-white py-6 px-2 md:p-6 md:p-10 rounded-xl border-2 border-indigo-50 shadow-sm">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                        {mode === 'create' ? 'Створення товару' : 'Редагування товару'}
                    </h1>

                    <form onSubmit={form.handleSubmit(form.onSubmit)} className="space-y-10">
                        <div className="space-y-6">
                            <div className="flex flex-col lg:flex-row lg:space-x-6">
                                <div className="flex-1">
                                    <FormField
                                        id="name"
                                        label="Назва товару"
                                        required
                                        placeholder="Наприклад, Труба зі сталі"
                                        errorMessage={form.errors.name?.message}
                                        {...form.register("name")}
                                        icon={IdentificationIcon}
                                        pattern={inputPatterns.message}
                                    />
                                </div>

                                <div className="flex-1 mt-3 lg:mt-0">
                                    <FormField
                                        id="slug"
                                        label="Slug"
                                        required
                                        placeholder="truba-zi-stali"
                                        errorMessage={form.errors.slug?.message}
                                        {...form.register("slug")}
                                        icon={IdentificationIcon}
                                        pattern={inputPatterns.message}
                                    />
                                </div>
                            </div>

                            <FormSelect
                                id="category_id"
                                register={form.register("category_id", { valueAsNumber: true })}
                                icon={IdentificationIcon}
                                options={categoryOptions}
                            />

                            <FormField
                                id="description"
                                component={TextareaField}
                                label="Опис продукту"
                                required
                                placeholder="Детальний опис продукту..."
                                errorMessage={form.errors.description?.message}
                                {...form.register("description")}
                                icon={IdentificationIcon}
                                pattern={inputPatterns.message}
                            />
                        </div>


                        <div className="space-y-6 border-t border-gray-200 pt-8">
                            <div className="flex flex-col gap-2.5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Медіафайли
                                    <span className="ml-1 text-gray-400">(jpg, jpeg, png, webp)</span>
                                </label>
                                <div className="mt-1.5 flex rounded-lg border border-dashed border-gray-300/75 hover:border-gray-400 transition-colors">
                                    <input
                                        id="photos"
                                        type="file"
                                        multiple
                                        accept=".jpg,.jpeg,.png,.webp"
                                        {...form.register("images")}
                                        className="w-full cursor-pointer rounded-lg p-4 text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-100"
                                    />
                                </div>
                                {form.errors.images && (
                                    <p className="mt-1 text-sm text-red-600">{form.errors.images.message as string}</p>
                                )}
                            </div>

                            {form.existingImages && form.existingImages.length > 0 && (
                                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                    {form.existingImages.map((img: { id: number; filename: string; alt: string }) => (
                                        <div key={img.id} className="relative group">
                                            <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_MEDIA_PATH}/${form.productSlug}/${img.filename}`}
                                                    alt={img.alt}
                                                    className="object-cover w-full h-full transition-opacity group-hover:opacity-75"
                                                    height={200}
                                                    width={200}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => form.markImageForDelete(img.id)}
                                                className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-1 shadow-sm hover:bg-white transition-colors"
                                            >
                                                <TrashIcon className="h-4 w-4 text-red-600" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-8 border-t border-gray-200 pt-8">
                            <h2 className="text-xl font-semibold text-gray-900">Варіації товару</h2>

                            <div className="space-y-5">
                                {form.fields.map((field: { rhfId: string; id?: number }, idx: number) => (
                                    <div key={field.rhfId} className="bg-white rounded-xl p-5 space-y-4 border-2 border-indigo-50 shadow-sm">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2">
                                            <FormField
                                                id={`variations.${idx}.price`}
                                                label="Ціна"
                                                placeholder="1500"
                                                required
                                                type="number"
                                                step="any"
                                                errorMessage={form.errors.variations?.[idx]?.price?.message}
                                                {...form.register(`variations.${idx}.price`, { valueAsNumber: true })}
                                                icon={IdentificationIcon}
                                            />

                                            <FormField
                                                id={`variations.${idx}.discount_percentage`}
                                                label="Знижка (%)"
                                                placeholder="20"
                                                {...form.register(`variations.${idx}.discount_percentage`, { valueAsNumber: true })}
                                                pattern={inputPatterns.numbers}
                                                icon={IdentificationIcon}
                                            />

                                            {['diameter', 'length', 'thickness', 'angle', 'metal_type'].map((fieldName) => (
                                                <FormField
                                                    key={fieldName}
                                                    id={`variations.${idx}.${fieldName}`}
                                                    label={getFieldLabel(fieldName)}
                                                    placeholder={getFieldPlaceholder(fieldName)}
                                                    {...form.register(`variations.${idx}.${fieldName}`)}
                                                    pattern={inputPatterns.message}
                                                    icon={IdentificationIcon}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => mode === 'edit' ? form.remove(idx, field.id) : form.remove(idx)}
                                            className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 transition-colors"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                            Видалити варіацію
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    form.append({
                                        ...(mode === 'edit' && { id: null }),
                                        price: 0,
                                        discount_percentage: 0,
                                        diameter: null,
                                        length: null,
                                        thickness: null,
                                        angle: null,
                                        metal_type: null,
                                    })
                                }
                                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-dashed border-indigo-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                            >
                                <PlusIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                                <span className="text-indigo-600 group-hover:text-indigo-700 transition-colors font-medium">
                                    Додати варіацію
                                </span>
                            </button>
                        </div>

                        <ConfirmButton
                            label={mode === 'create' ? 'Створити продукт' : 'Оновити продукт'}
                            isLoading={form.isSubmitting}
                            icon={<ArrowLeftEndOnRectangleIcon className="h-5 w-5" />}
                            className="w-full !mt-10"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

function getFieldLabel(name: string): string {
    const labels: { [key: string]: string } = {
        diameter: 'Діаметр, мм',
        length: 'Довжина, м',
        thickness: 'Товщина, мм',
        angle: 'Кут, °',
        metal_type: 'Тип металу'
    }
    return labels[name] || name
}

function getFieldPlaceholder(name: string): string {
    const placeholders: { [key: string]: string } = {
        diameter: '150 або 300/360',
        length: '1',
        thickness: '0.8',
        angle: '45',
        metal_type: 'Сталь'
    }
    return placeholders[name] || 'Введіть значення'
}
