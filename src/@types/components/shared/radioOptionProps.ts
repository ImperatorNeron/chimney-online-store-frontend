interface RadioOptionProps {
    value: string;
    label: string;
    checked: boolean;
    onChange: (value: string) => void;
    name: string;
}