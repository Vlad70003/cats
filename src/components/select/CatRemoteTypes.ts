export type Option = {
    id: string;
    name: string;
};

export type OptionProps = {
    option: Option;
    onClick: (value: Option["id"]) => void;
};

export type SelectProps = {
    value: string;
    url?: string;
    options?: Option[];
    placeholder?: string;
    mode?: "rows" | "cells";
    status?: "default" | "invalid";
    onChange?: (selected: Option["id"]) => void;
    onClose?: () => void;
};