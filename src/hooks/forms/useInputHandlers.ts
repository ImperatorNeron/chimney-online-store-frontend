export default function useInputHandlers(pattern: RegExp) {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!pattern.test(e.key)) {
            e.preventDefault();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = e.clipboardData.getData('text');
        if (!pattern.test(pastedData)) {
            e.preventDefault();
        }
    };

    return {
        onKeyPress: handleKeyPress,
        onPaste: handlePaste,
    };
};
