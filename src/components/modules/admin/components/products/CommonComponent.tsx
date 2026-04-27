import { listReadCategorySchema } from "@/api/types/types";
import FormField from "@/components/shared/FormField";
import FormSelect from "@/components/shared/FormSelect";
import GenericTable, { Column } from "@/components/shared/AdminTable";
import SortableHeader from "@/components/shared/AdminTableSortableHeader";
import BackToPageButton from "@/components/ui/BackToPageButton";
import TextareaField from "@/components/ui/Textarea";
import { inputPatterns } from "@/utils/field.patterns";
import { ArrowLeftEndOnRectangleIcon, IdentificationIcon, PencilIcon, PlusIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import InfiniteScrollSentinel from "@/components/modules/admin/components/InfiniteScrollSentinel";
import { useState } from "react";
import type { VariationSortField } from "@/constants/orderFields";

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
                                                    src={`${process.env.NEXT_PUBLIC_MEDIA_PATH}/${process.env.NEXT_PUBLIC_MEDIA_ITEMS}/${form.productSlug}/${img.filename}`}
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

                        <VariationsSection form={form} mode={mode} />
                    </form>
                </div>
            </div>
        </div>
    )
}

const VARIATION_COLS = [
    { key: "price", label: "Ціна", placeholder: "1500", type: "number" },
    { key: "discount_percentage", label: "Знижка %", placeholder: "0", type: "number" },
    { key: "diameter", label: "Діаметр", placeholder: "150" },
    { key: "length", label: "Довжина", placeholder: "1" },
    { key: "thickness", label: "Товщина", placeholder: "0.8" },
    { key: "angle", label: "Кут", placeholder: "45" },
    { key: "metal_type", label: "Метал", placeholder: "Сталь" },
] as const;

function VariationsSection({ form, mode }: { form: any; mode: Mode }) {
    const [editingIdx, setEditingIdx] = useState<number | null>(null);
    const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set());
    const [editedServerValues, setEditedServerValues] = useState<Record<number, any>>({});
    const watched: any[] = form.watch?.("variations") || [];

    // Reset editing state when sort changes
    const sortKey = mode === 'edit' ? `${form.sortField}-${form.sortOrdering}` : '';
    const [prevSortKey, setPrevSortKey] = useState(sortKey);
    if (sortKey !== prevSortKey) {
        setPrevSortKey(sortKey);
        if (editingIdx !== null) setEditingIdx(null);
    }

    const isEditingEmpty = editingIdx !== null && (() => {
        const v = watched[editingIdx];
        return !v || (!v.price && !v.diameter && !v.length && !v.thickness && !v.angle && !v.metal_type);
    })();

    const handleAdd = () => {
        form.prepend({
            ...(mode === 'edit' && { id: null }),
            price: 0,
            discount_percentage: 0,
            diameter: null,
            length: null,
            thickness: null,
            angle: null,
            metal_type: null,
        });
        setEditingIdx(0);
    };

    // Build rows: create mode uses fields directly (original pattern), edit mode merges local + server
    const serverItemsRaw = mode === 'edit' ? (form.variations?.items ?? []).filter((v: any) => !hiddenIds.has(v.id)) : [];
    const seenIds = new Set<number>();
    const serverItems = serverItemsRaw.filter((v: any) => {
        if (seenIds.has(v.id)) return false;
        seenIds.add(v.id);
        return true;
    });
    const localFields: any[] = mode === 'edit' ? (form.fields ?? []).filter((f: any) => !f.id) : [];

    let rows: any[];
    if (mode === 'create') {
        // Original pattern: fields for stable keys, watched for values
        rows = (form.fields ?? []).map((field: any, idx: number) => ({
            ...field,
            _idx: idx,
            _values: watched[idx] || {},
        }));
    } else {
        // Edit mode: local new fields + server items
        rows = [
            ...localFields.map((field: any, idx: number) => ({
                ...field,
                _idx: idx,
                _values: watched[idx] || {},
                _isLocal: true,
            })),
            ...serverItems.map((item: any, idx: number) => ({
                ...item,
                _idx: localFields.length + idx,
                _values: editedServerValues[item.id] || item,
                rhfId: `server-${item.id}`,
            })),
        ];
    }

    const columns: Column<typeof rows[number]>[] = VARIATION_COLS.map((col) => {
        const { key, label, placeholder } = col;
        const type = 'type' in col ? col.type : undefined;
        return {
        header: mode === 'edit'
            ? <SortableHeader
                label={label}
                sortField={key as VariationSortField}
                activeField={form.sortField}
                ordering={form.sortOrdering}
                onSort={form.handleVariationSort}
              />
            : label,
        render: (row: any) => {
            if (editingIdx === row._idx) {
                if (mode === 'edit' && !row._isLocal) {
                    // Server item: use local state, not form.register (index shifts on sort)
                    const currentVal = row._values[key];
                    return (
                        <input
                            key={`${row.rhfId}-${key}`}
                            type={type || "text"}
                            step={type === "number" ? "any" : undefined}
                            placeholder={placeholder}
                            defaultValue={currentVal ?? ""}
                            onChange={(e) => {
                                const v = type === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value;
                                setEditedServerValues(prev => ({
                                    ...prev,
                                    [row.id]: { ...(prev[row.id] || row._values), [key]: v },
                                }));
                                form.updateServerVariation?.(row.id, { ...(editedServerValues[row.id] || row._values), [key]: v });
                            }}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                    );
                }
                return (
                    <input
                        key={`${row.rhfId}-${key}`}
                        type={type || "text"}
                        step={type === "number" ? "any" : undefined}
                        placeholder={placeholder}
                        {...form.register(
                            `variations.${row._idx}.${key}`,
                            type === "number" ? { valueAsNumber: true } : undefined,
                        )}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                );
            }
            const val = row._values[key];
            return <span className="text-xs">{val != null && val !== "" ? val : "—"}</span>;
        },
    };});

    columns.push({
        header: "",
        render: (row: any) => (
            <div className="flex items-center gap-0.5">
                <button
                    type="button"
                    onClick={() => {
                        setEditingIdx(editingIdx === row._idx ? null : row._idx);
                    }}
                    className={`p-1.5 rounded-full transition-colors ${
                        editingIdx === row._idx
                            ? "bg-gray-200 text-gray-700"
                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                    title={editingIdx === row._idx ? "Готово" : "Редагувати"}
                >
                    {editingIdx === row._idx
                        ? <CheckIcon className="h-4 w-4" />
                        : <PencilIcon className="h-4 w-4" />}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (editingIdx === row._idx) setEditingIdx(null);
                        if (mode === 'edit') {
                            if (row._idx >= localFields.length) {
                                // Server item
                                const serverId = serverItems[row._idx - localFields.length]?.id;
                                if (serverId) {
                                    form.remove(undefined, serverId);
                                    setHiddenIds(prev => new Set(prev).add(serverId));
                                }
                            } else {
                                // New local item — find its index in fields
                                const fieldIdx = form.fields.findIndex((f: any) => f.rhfId === row.rhfId);
                                if (fieldIdx >= 0) form.remove(fieldIdx, row.id);
                            }
                        } else {
                            form.remove(row._idx);
                        }
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Видалити"
                >
                    <TrashIcon className="h-4 w-4" />
                </button>
            </div>
        ),
    });

    return (
        <div className="space-y-4 border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                    Варіації <span className="text-sm font-normal text-gray-500">({rows.length})</span>
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={isEditingEmpty}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Додати
                    </button>
                    <button
                        type="submit"
                        disabled={form.isSubmitting}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {form.isSubmitting
                            ? <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                            : <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />}
                        {mode === 'create' ? 'Створити продукт' : 'Оновити продукт'}
                    </button>
                </div>
            </div>

            {rows.length === 0 && !form.variations?.loading ? (
                <div className="text-center text-sm text-gray-400 py-8">
                    Немає варіацій
                </div>
            ) : (
                <>
                    <div className={`transition-opacity ${form.variations?.loading && rows.length > 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                        <GenericTable
                        data={rows}
                        columns={columns}
                        rowKey={(row) => row.rhfId}
                        columnTemplate="repeat(7, minmax(70px, 1fr)) 72px"
                    />
                    </div>
                    {mode === 'edit' && form.variations && (
                        <InfiniteScrollSentinel
                            hasMore={form.variations.items.length < form.variations.total}
                            loading={form.variations.loadingMore}
                            onLoadMore={form.variations.loadMore}
                            total={form.variations.total}
                            loaded={form.variations.items.length}
                        />
                    )}
                </>
            )}
        </div>
    );
}
