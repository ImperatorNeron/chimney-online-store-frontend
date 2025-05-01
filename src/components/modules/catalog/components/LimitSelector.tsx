"use client";

import useLimitSelector from "../hooks/useLimitSelector";
import Selector from "@/components/shared/Selector";


export default function LimitSelector() {
    const { currentLimit, handleChange } = useLimitSelector();

    return (
        <Selector label="Показати" name="limit" options={[12, 24, 36]} currentValue={currentLimit} handleChange={handleChange} width="w-20" />
    );
}
