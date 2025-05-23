'use client'

import useCategories from "@/components/modules/admin/hooks/products/useCategories";
import ProductActionComponent from "../../../../../../components/modules/admin/components/products/CommonComponent";
import { useUpdateProduct } from "../../../../../../components/modules/admin/hooks/products/useUpdateProduct";

export default function UpdateProductPage() {
    const form = useUpdateProduct();
    const { data } = useCategories();

    return (
        <ProductActionComponent categories={data} form={form} mode="edit" />
    )
}