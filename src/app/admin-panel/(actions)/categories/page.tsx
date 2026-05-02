'use client';

import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { categoryService, ReadCategory } from "@/api/services/category.service";
import { useAuthStore } from "@/store/auth.store";
import { NotificationService } from "@/api/services/notification.service";
import useFetchData from "@/components/modules/admin/hooks/common/useFetchData";
import { CategoryImage } from "@/components/modules/categories/components/CategoryImage";
import { joinMediaPath } from "@/utils/utils";

interface CategoryFormData {
    name: string;
    slug: string;
    parent_id: number | null;
    image: File | null;
}

const emptyForm: CategoryFormData = { name: "", slug: "", parent_id: null, image: null };

export default function CategoriesPage() {
    const { getValidToken } = useAuthStore();
    const { data: categories, loading, reload } = useFetchData<ReadCategory[]>(
        (token) => categoryService.getCategories() as Promise<ReadCategory[]>,
    );

    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<CategoryFormData>(emptyForm);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => { document.title = "Категорії"; }, []);

    const mainCategories = (categories ?? []).filter(c => !c.parent_id);
    const getChildren = (parentId: number) => (categories ?? []).filter(c => c.parent_id === parentId);

    const handleCreate = async () => {
        if (!form.name || !form.slug) {
            NotificationService.error("Назва та slug обов'язкові");
            return;
        }
        try {
            setSaving(true);
            const token = await getValidToken();
            if (!token) return;
            await categoryService.createCategory(token, {
                name: form.name,
                slug: form.slug,
                parent_id: form.parent_id,
                image: form.image ?? undefined,
            });
            NotificationService.success("Категорію створено");
            setForm(emptyForm);
            setShowCreateForm(false);
            reload();
        } catch (e: any) {
            NotificationService.error(e.message || "Не вдалося створити категорію");
        } finally {
            setSaving(false);
        }
    };

    const handleUpdate = async (id: number) => {
        if (!form.name || !form.slug) {
            NotificationService.error("Назва та slug обов'язкові");
            return;
        }
        try {
            setSaving(true);
            const token = await getValidToken();
            if (!token) return;
            const cat = (categories ?? []).find(c => c.id === id);
            let parentSlug: string | undefined;
            if (cat?.parent_id) {
                const parent = (categories ?? []).find(c => c.id === cat.parent_id);
                parentSlug = parent?.slug;
            }
            await categoryService.updateCategory(token, id, {
                name: form.name,
                slug: form.slug,
                parent_slug: parentSlug,
                image: form.image ?? undefined,
            });
            NotificationService.success("Категорію оновлено");
            setEditingId(null);
            setForm(emptyForm);
            reload();
        } catch (e: any) {
            NotificationService.error(e.message || "Не вдалося оновити категорію");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Видалити категорію? Всі підкатегорії також будуть видалені.")) return;
        try {
            const token = await getValidToken();
            if (!token) return;
            await categoryService.deleteCategory(token, id);
            NotificationService.success("Категорію видалено");
            reload();
        } catch (e: any) {
            NotificationService.error(e.message || "Не вдалося видалити категорію");
        }
    };

    const startEdit = (cat: ReadCategory) => {
        setEditingId(cat.id);
        setForm({ name: cat.name, slug: cat.slug, parent_id: cat.parent_id, image: null });
        setShowCreateForm(false);
    };

    const startCreate = (parentId: number | null = null) => {
        setShowCreateForm(true);
        setEditingId(null);
        setForm({ ...emptyForm, parent_id: parentId });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-[1920px] mx-auto px-4 pb-16">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Категорії</h1>
                    <p className="text-gray-600">Управління категоріями та підкатегоріями каталогу</p>
                </div>
                <button
                    onClick={() => startCreate(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
                >
                    <PlusIcon className="h-4 w-4" />
                    Додати категорію
                </button>
            </div>

            {showCreateForm && (
                <CategoryForm
                    form={form}
                    setForm={setForm}
                    onSave={handleCreate}
                    onCancel={() => { setShowCreateForm(false); setForm(emptyForm); }}
                    saving={saving}
                    title={form.parent_id ? "Нова підкатегорія" : "Нова категорія"}
                />
            )}

            {loading ? (
                <div className="text-sm text-gray-500">Завантаження...</div>
            ) : !mainCategories.length ? (
                <div className="text-center text-gray-500 py-12">Категорій ще немає</div>
            ) : (
                <div className="space-y-4">
                    {mainCategories.map(cat => (
                        <div key={cat.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                            <CategoryRow
                                cat={cat}
                                isEditing={editingId === cat.id}
                                form={form}
                                setForm={setForm}
                                onEdit={() => startEdit(cat)}
                                onDelete={() => handleDelete(cat.id)}
                                onSave={() => handleUpdate(cat.id)}
                                onCancel={() => { setEditingId(null); setForm(emptyForm); }}
                                saving={saving}
                            />
                            <div className="pl-8 border-t border-gray-100">
                                {getChildren(cat.id).map(sub => (
                                    <CategoryRow
                                        key={sub.id}
                                        cat={sub}
                                        isEditing={editingId === sub.id}
                                        form={form}
                                        setForm={setForm}
                                        onEdit={() => startEdit(sub)}
                                        onDelete={() => handleDelete(sub.id)}
                                        onSave={() => handleUpdate(sub.id)}
                                        onCancel={() => { setEditingId(null); setForm(emptyForm); }}
                                        saving={saving}
                                        isChild
                                        parentSlug={cat.slug}
                                    />
                                ))}
                                <button
                                    onClick={() => startCreate(cat.id)}
                                    className="flex items-center gap-1 px-4 py-2 text-xs text-gray-500 hover:text-black transition-colors"
                                >
                                    <PlusIcon className="h-3 w-3" />
                                    Додати підкатегорію
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function CategoryForm({
    form, setForm, onSave, onCancel, saving, title,
}: {
    form: CategoryFormData;
    setForm: (f: CategoryFormData) => void;
    onSave: () => void;
    onCancel: () => void;
    saving: boolean;
    title: string;
}) {
    return (
        <div className="border border-gray-200 rounded-2xl p-5 mb-6">
            <h3 className="text-sm font-semibold mb-3">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Назва"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                <input
                    type="text"
                    placeholder="Slug (URL)"
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                    className="h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-black">
                    <PhotoIcon className="h-5 w-5" />
                    {form.image ? form.image.name : "Обрати фото"}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => setForm({ ...form, image: e.target.files?.[0] ?? null })}
                    />
                </label>
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    onClick={onSave}
                    disabled={saving}
                    className="px-5 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 disabled:opacity-50"
                >
                    {saving ? "Збереження..." : "Зберегти"}
                </button>
                <button
                    onClick={onCancel}
                    className="px-5 py-2 text-sm text-gray-600 hover:text-black"
                >
                    Скасувати
                </button>
            </div>
        </div>
    );
}

function CategoryRow({
    cat, isEditing, form, setForm, onEdit, onDelete, onSave, onCancel, saving, isChild, parentSlug,
}: {
    cat: ReadCategory;
    isEditing: boolean;
    form: CategoryFormData;
    setForm: (f: CategoryFormData) => void;
    onEdit: () => void;
    onDelete: () => void;
    onSave: () => void;
    onCancel: () => void;
    saving: boolean;
    isChild?: boolean;
    parentSlug?: string;
}) {
    if (isEditing) {
        return (
            <div className="p-4 bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <input
                        type="text"
                        value={form.slug}
                        onChange={e => setForm({ ...form, slug: e.target.value })}
                        className="h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-black">
                        <PhotoIcon className="h-5 w-5" />
                        {form.image ? form.image.name : "Змінити фото"}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => setForm({ ...form, image: e.target.files?.[0] ?? null })}
                        />
                    </label>
                </div>
                <div className="flex gap-2 mt-3">
                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="px-4 py-1.5 bg-black text-white text-xs rounded-full hover:bg-gray-800 disabled:opacity-50"
                    >
                        {saving ? "..." : "Зберегти"}
                    </button>
                    <button onClick={onCancel} className="px-4 py-1.5 text-xs text-gray-600 hover:text-black">
                        Скасувати
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center justify-between px-4 py-3 ${isChild ? 'border-b border-gray-50' : ''}`}>
            <div className="flex items-center gap-3">
                <CategoryImage
                    imageSrc={cat.file_path
                        ? (parentSlug ? joinMediaPath("categories", parentSlug, cat.file_path) : joinMediaPath("categories", cat.file_path))
                        : ""}
                    alt={cat.name}
                    size={32}
                />
                <div>
                    <span className={`text-sm ${isChild ? 'text-gray-700' : 'font-medium'}`}>{cat.name}</span>
                    <span className="ml-2 text-xs text-gray-400">{cat.slug}</span>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <button
                    onClick={onEdit}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                >
                    <PencilIcon className="h-4 w-4" />
                </button>
                <button
                    onClick={onDelete}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                >
                    <TrashIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
