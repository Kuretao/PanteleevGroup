import React, {useEffect, useState} from "react";
import "./Dropdown.css";
import Cookies from "js-cookie";

export const Dropdown = ({ label, options, value, onChange, disabled,zIndex }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".custom-dropdown")) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // if (!options || options.length === 0) {
    //     return <div className="dropdown-group">Нет доступных опций</div>;
    // }
    console.log("Dropdown value:", value);
    console.log("Dropdown options:", options);


    return (
        <div className="dropdown-group" style={{zIndex: zIndex, position:"relative"}}>
            <div className={`custom-dropdown ${disabled ? "disabled" : ""}`}>
                <button
                    className="dropdown-button"
                    disabled={disabled}
                >
                    {value && options.find((opt) => opt.value === value)
                        ? options.find((opt) => opt.value === value).label
                        : label}
                    <img onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)} src="/images/icons/arrow-right.svg" alt=""/>
                </button>
                {isDropdownOpen && (
                    <ul className="dropdown-options">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsDropdownOpen(false);
                                }}
                                className="dropdown-option"
                            >
                                <i className={option.classname}></i> {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};



export const DropdownCookie = ({ label, options, value, onChange, disabled,zIndex }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".custom-dropdown")) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // if (!options || options.length === 0) {
    //     return <div className="dropdown-group">Нет доступных опций</div>;
    // }
    console.log("Dropdown value:", value);
    console.log("Dropdown options:", options);
    const fullOptions = [...options, { value: "add", label: "add", classname: "" }];


    return (
        <div className="dropdown-group" style={{zIndex: zIndex, position:"relative"}}>
            <div className={`custom-dropdown ${disabled ? "disabled" : ""}`}>
                <button
                    className="dropdown-button"
                    disabled={disabled}
                >
                    {value && options.find((opt) => opt.value === value)
                        ? options.find((opt) => opt.value === value).label
                        : label}
                    <img onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)} src="/images/icons/arrow-right.svg" alt=""/>
                </button>
                {isDropdownOpen && (
                    <ul className="dropdown-options">
                        {fullOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => {
                                    if (option.value !== "add") {
                                        Cookies.set("inn", option.value, {expires: 7});
                                        onChange(option.value);
                                        setIsDropdownOpen(false);
                                    } else {
                                        onChange("add");
                                        setIsDropdownOpen(false);
                                    }
                                }}
                                className={
                                    option.value === "add" ? "add" : "dropdown-option"
                                }
                            >
                                <i className={option.classname}></i> {option.label}
                            </li>
                        ))}
                    </ul>

                )}

            </div>
        </div>
    );
};