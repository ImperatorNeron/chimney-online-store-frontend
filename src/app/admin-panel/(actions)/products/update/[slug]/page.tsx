'use client'

import ProductActionComponent from "@/components/modules/admin/components/products/CommonComponent";
import useCategories from "@/components/modules/admin/hooks/products/useCategories";
import { useUpdateProduct } from "@/components/modules/admin/hooks/products/useUpdateProduct";
import { useEffect } from "react";

export default function UpdateProductPage() {
    const form = useUpdateProduct();
    const { data } = useCategories();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Оновлення продукту";
    }, []);


    return (
        <ProductActionComponent categories={data} form={form} mode="edit" />
    )
}