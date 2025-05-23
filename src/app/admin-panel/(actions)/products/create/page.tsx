'use client'

import useCategories from "@/components/modules/admin/hooks/products/useCategories";
import ProductActionComponent from "../../../../../components/modules/admin/components/products/CommonComponent";
import { useCreateProduct } from "../../../../../components/modules/admin/hooks/products/useCreateProduct";

export default function CreateProductPage() {
    const form = useCreateProduct();
    const { data } = useCategories();

    return (
        <ProductActionComponent categories={data} form={form} mode="create" />
    )
}