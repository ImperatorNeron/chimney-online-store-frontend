'use client'

import ProductActionComponent from "@/components/modules/admin/components/products/CommonComponent";
import useCategories from "@/components/modules/admin/hooks/products/useCategories";
import { useCreateProduct } from "@/components/modules/admin/hooks/products/useCreateProduct";
import { useEffect } from "react";

export default function CreateProductPage() {
    const form = useCreateProduct();
    const { data } = useCategories();

    useEffect(() => {
        document.title = "Створити продукт";
    }, []);

    return (
        <ProductActionComponent categories={data} form={form} mode="create" />
    )
}