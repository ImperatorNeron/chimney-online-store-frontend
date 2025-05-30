import { useRouter, useSearchParams } from "next/navigation";

export const useFilterSelect = (name: string, options: (string | null)[]) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentValue = searchParams.get(name) || '';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);
        if (e.target.value) {
            params.set(name, e.target.value);
        } else {
            params.delete(name);
        }
        params.delete("page");
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const sortedOptions = options
        .filter((opt): opt is string => Boolean(opt))
        .sort((a, b) => {
            const aNum = Number(a);
            const bNum = Number(b);

            const aIsNum = !isNaN(aNum);
            const bIsNum = !isNaN(bNum);

            if (aIsNum && bIsNum) {
                return aNum - bNum;
            }

            return a.localeCompare(b, undefined, { sensitivity: 'base' });
        });

    return {
        currentValue,
        sortedOptions,
        handleChange,
    };
};
