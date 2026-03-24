import { useRouter, useSearchParams } from "next/navigation";
import { useCatalogNavigation } from "../providers/CatalogNavigationProvider";

export default function useLimitSelector() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { navigate } = useCatalogNavigation();

    const currentLimit = searchParams.get("limit") || "12";

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("limit", e.target.value);
        newParams.delete("page");
        navigate(() => router.push(`?${newParams.toString()}`));
    };

    return {
        currentLimit,
        handleChange,
    };
}
