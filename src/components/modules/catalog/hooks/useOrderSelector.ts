import { useRouter, useSearchParams } from "next/navigation";
import { useCatalogNavigation } from "../providers/CatalogNavigationProvider";

export default function useOrderSelector() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { navigate } = useCatalogNavigation();

    const currentField = searchParams.get("field") || "created_at";
    const currentOrdering = searchParams.get("ordering") || "asc";
    const currentValue = `${currentField}:${currentOrdering}`;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, ordering] = e.target.value.split(":");
        const newParams = new URLSearchParams(searchParams.toString());

        newParams.set("field", field);
        newParams.set("ordering", ordering);
        newParams.delete("page");
        navigate(() => router.push(`?${newParams.toString()}`));
    };

    return {
        currentValue,
        handleChange,
    };
}
