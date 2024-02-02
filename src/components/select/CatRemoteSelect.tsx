import React, {useState, useEffect, useRef} from "react";
import type {MouseEventHandler} from "react";
import {Option, OptionProps, SelectProps} from "./CatRemoteTypes";
import classNames from 'classnames';
import axios from 'axios';

import ArrowDown from "../../assets/img/chevron-down.svg";
import "./style.scss"

const OptionEl = (props: OptionProps) => {
    const {
        active,
        option: {id, name},
        onClick
    } = props;
    const optionRef = useRef<HTMLLIElement>(null);

    const handleClick = (
        clickedValue: Option["id"]
    ): MouseEventHandler<HTMLLIElement> => () => {
        onClick(clickedValue);
    };

    const optionClasses = classNames({
        option: true,
        'option--active': active?.id === id
    });

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
            className={optionClasses}
            value={id}
            onClick={handleClick(id)}
            tabIndex={0}
            ref={optionRef}
        >
            {id}
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
        onClose,
        lazyLoad = false,
        prepare,
        changePrepare
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<Option[]>([]);
    // const [prepare, setPrepare] = useState<boolean>(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const {target} = event;
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

    const handleOptionClick = (value: Option) => {
        setIsOpen(false);
        onChange?.(value);
    };

    const getOptions = async ({open}: { open: boolean }) => {
        if (url && !options.length) {
            changePrepare(true);
            try {
                const response = (await axios.get(url)).data;
                if (response.data?.length) {
                    !open && handleOptionClick(response.data?.[0])
                }
                setOptions(() => response.data)
            } catch (e) {

            }

            changePrepare(false);
        }
        open && setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const placeholderEl = placeholderRef.current;
        if (!placeholderEl) return;

        if (!lazyLoad) {
            getOptions({open: false});
        }

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

    const selectWrapperClass = classNames({
        selectWrapper: true,
    });

    const inputClass = classNames({
        base: true,
    })

    return (
        <div
            className={selectWrapperClass}
            ref={rootRef}
            data-is-active={isOpen}
            data-mode={mode}
        >
            <>
                <img
                    className="arrow"
                    src={ArrowDown}
                    alt="arrow"
                />
            </>
            <div
                className={inputClass}
                data-status={status}
                onClick={() => getOptions({open: true})}
                role="button"
                tabIndex={0}
                ref={placeholderRef}
            >
                {prepare ? 'Загрузка' : value?.id || placeholder}
            </div>
            {isOpen && (
                <ul className="select">
                    {options?.map((option: Option) => (
                        <OptionEl
                            key={option.id}
                            active={value}
                            option={option}
                            onClick={() => handleOptionClick(option)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
