import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { productService } from '@/api/services/products.service';
import { NotificationService } from '@/api/services/notification.service';
import { ReadImages } from '@/api/types/types';
import { useAuthStore } from '@/store/auth.store';
import { updateAbsoluteProductSchema, UpdateAbsoluteProductSchema } from '@/schemas/products';

const variationKeys = [
    'id', 'price', 'discount_percentage',
    'diameter', 'length', 'thickness', 'angle', 'metal_type'
] as const;

export function useUpdateProduct() {
    const router = useRouter();
    const { getValidToken } = useAuthStore.getState();
    const { slug: productSlug } = useParams() as { slug: string };

    const [existingImages, setExistingImages] = useState<ReadImages>([]);
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
    const [productId, setProductId] = useState<number>();
    const removedVariationIds = useRef<number[]>([]);
    const initialVariations = useRef<UpdateAbsoluteProductSchema['variations']>([]);

    const form = useForm<UpdateAbsoluteProductSchema>({
        resolver: zodResolver(updateAbsoluteProductSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            category_id: 0,
            images: undefined,
            variations: []
        },
    });
    const { register, control, handleSubmit, reset, formState } = form;
    const { fields, append, replace, remove } = useFieldArray({
        name: 'variations',
        control,
        keyName: 'rhfId'
    });
    const { errors, isSubmitting } = formState;

    const mapDtoVariation = useCallback((v: any) => ({
        id: v.id,
        price: v.price ?? undefined,
        discount_percentage: v.discount_percentage ?? undefined,
        diameter: v.diameter ?? undefined,
        length: v.length ?? undefined,
        thickness: v.thickness ?? undefined,
        angle: v.angle ?? undefined,
        metal_type: v.metal_type ?? undefined,
    }), []);

    const resetForm = useCallback((dto: any) => {
        const variations = dto.variations.map(mapDtoVariation);
        reset({
            name: dto.name,
            slug: dto.slug,
            description: dto.description || '',
            category_id: dto.category_id,
            images: undefined,
            variations,
        });
        replace(variations);
        initialVariations.current = variations;
        setExistingImages(dto.images);
        removedVariationIds.current = [];
        setImagesToDelete([]);
    }, [mapDtoVariation, reset, replace]);

    useEffect(() => {
        const load = async () => {
            try {
                const dto = await productService.getFullProduct(productSlug);
                if (!dto) throw new Error('Product not found');
                setProductId(dto.id);
                resetForm(dto);
            } catch (error) {
                console.error('Failed to load product:', error);
                NotificationService.error('Не вдалося завантажити продукт');
                router.push('/admin-panel/products');
            }
        };
        load();
    }, [productSlug, resetForm, router]);

    const markImageForDelete = (id: number) => {
        setExistingImages(imgs => imgs.filter(img => img.id !== id));
        setImagesToDelete(ids => [...ids, id]);
    };

    const handleRemoveVariation = (index: number, id?: number) => {
        if (id) removedVariationIds.current.push(id);
        remove(index);
    };

    // Функція для нормалізації значень перед порівнянням
    const normalizeValue = (value: any) => {
        if (value === null || value === '') return undefined;
        return value;
    };

    const buildVariationPayload = useCallback((currentVariations: UpdateAbsoluteProductSchema['variations']) => {
        const payload: any[] = [];
        const initialVars = initialVariations.current;

        currentVariations.forEach(v => {
            const base = variationKeys.reduce((acc, key) => {
                if (key !== 'id') acc[key] = (v as any)[key];
                return acc;
            }, {} as Record<string, any>);

            const initialVar = initialVars.find(iv => iv.id === v.id);

            if (v.id && initialVar) {
                // Перевіряємо зміни з нормалізацією значень
                const hasChanges = variationKeys.some(key => {
                    if (key === 'id') return false;

                    const currentValue = normalizeValue(v[key]);
                    const initialValue = normalizeValue(initialVar[key]);

                    return currentValue !== initialValue;
                });

                if (hasChanges) {
                    payload.push({ action: 'update', id: v.id, ...base });
                }
            } else if (!v.id) {
                payload.push({ action: 'create', ...base });
            }
        });

        removedVariationIds.current.forEach(id => {
            payload.push({ action: 'delete', id });
        });

        return payload;
    }, []);

    const onSubmit: SubmitHandler<UpdateAbsoluteProductSchema> = async data => {
        const totalImages = existingImages.length + (data.images?.length || 0);
        if (totalImages < 1) {
            NotificationService.error('Повинно залишитися хоча б одне зображення');
            return;
        }

        const formData = new FormData();
        ['name', 'slug', 'description', 'category_id'].forEach(key => {
            formData.append(key, String((data as any)[key] || ''));
        });

        Array.from((data.images || []) as FileList).forEach(file => {
            formData.append('new_images', file, file.name);
        });

        if (imagesToDelete.length) {
            formData.append('delete_image_ids', JSON.stringify(imagesToDelete));
        }

        formData.append('variations_json', JSON.stringify(buildVariationPayload(data.variations)));

        try {
            const token = await getValidToken();
            if (!token) {
                return router.push('/auth/login');
            }

            if (productId === undefined) {
                throw new Error('ID продукту не визначено');
            }

            await productService.updateProduct(token, productId, formData);
            NotificationService.success('Продукт успішно оновлено');

            // Оновлюємо дані форми після успішного оновлення
            const updated = await productService.getFullProduct(data.slug);
            if (!updated) throw new Error('Не вдалося завантажити оновлений продукт');

            resetForm(updated);
            router.push(`/admin-panel/products/update/${data.slug}`);
        } catch (error) {
            console.error('Помилка оновлення продукту:', error);
            NotificationService.error('Помилка оновлення продукту');
        }
    };

    return {
        register,
        control,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        fields,
        append,
        remove: handleRemoveVariation,
        existingImages,
        markImageForDelete,
    };
}