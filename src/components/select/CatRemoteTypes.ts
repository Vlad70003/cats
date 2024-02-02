export type Option = {
    id: string;
    name: string;
    min_size: string;
};

export type OptionProps = {
    active: Option | null;
    option: Option;
    onClick: (value: Option["id"]) => void;
};

export type SelectProps = {
    value: Option | null;
    url?: string;
    options?: Option[];
    placeholder?: string;
    mode?: "rows" | "cells";
    status?: "default" | "invalid";
    lazyLoad?: boolean;
    onChange?: (selected: Option) => void;
    onClose?: () => void;

    prepare: boolean;
    changePrepare: (status: boolean) => void;
};