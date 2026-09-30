import { useState } from 'react';

export default function useToggleListItem() {
    const [activeIndices, setActiveIndices] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setActiveIndices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return { activeIndices, toggleItem };
};