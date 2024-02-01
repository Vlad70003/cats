import React, { useState, useEffect, useRef } from "react";
import type { MouseEventHandler } from "react";
import {Option, OptionProps, SelectProps} from "./CatRemoteTypes";

import ArrowDown from "../../assets/arrow-dropdown.svg";
import "./style.scss"

const OptionEl = (props: OptionProps) => {
    const {
        option: { id, name },
        onClick
    } = props;
    const optionRef = useRef<HTMLLIElement>(null);

    const handleClick = (
        clickedValue: Option["id"]
    ): MouseEventHandler<HTMLLIElement> => () => {
        onClick(clickedValue);
    };

    useEffect(() => {
        const option = optionRef.current;
        if (!option) return;
        const handleEnterKeyDown = (event: KeyboardEvent) => {
            if (document.activeElement === option && event.key === "Enter") {
                onClick(id);
            }
        };

        option.addEventListener("keydown", handleEnterKeyDown);
        return () => {
            option.removeEventListener("keydown", handleEnterKeyDown);
        };
    }, [id, onClick]);

    return (
        <li
            className="option"
            value={id}
            onClick={handleClick(id)}
            tabIndex={0}
            data-testid={`select-option-${id}`}
            ref={optionRef}
        >
            {name}
        </li>
    );
};


const Select = (props: SelectProps) => {
    const {
        value,
        url,
        mode = "rows",
        placeholder,
        status = "default",
        onChange,
        onClose
    } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<Option[]>([])
    const rootRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                isOpen && onClose?.();
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [onClose]);

    useEffect(() => {
        const placeholderEl = placeholderRef.current;
        if (!placeholderEl) return;

        const handleEnterKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                setIsOpen((prev) => !prev);
            }
        };
        placeholderEl.addEventListener("keydown", handleEnterKeyDown);

        return () => {
            placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
        };
    }, []);

    const handleOptionClick = (value: Option["id"]) => {
        setIsOpen(false);
        onChange?.(value);
    };
    const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = async () => {
        if (url && !options.length) {
            await fetch(url).then(res => res.json()).then(data => {
                setOptions(() => data.data)
            });
        }

        setIsOpen((prev) => !prev);
    };

    return (
        <div
            className="selectWrapper"
            ref={rootRef}
            data-is-active={isOpen}
            data-mode={mode}
            data-testid="selectWrapper"
        >
            <div className="arrow">
                <img src={ArrowDown} />
            </div>
            <div
                className="placeholder"
                data-status={status}
                onClick={handlePlaceHolderClick}
                role="button"
                tabIndex={0}
                ref={placeholderRef}
            >
                {value || placeholder}
            </div>
            {isOpen && (
                <ul className="select" data-testid="selectDropdown">
                    {options?.map((option: Option) => (
                        <OptionEl
                            key={option.id}
                            option={option}
                            onClick={handleOptionClick}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
