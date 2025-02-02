import React, {useEffect, useState} from "react";
import "./Dropdown.css";

export const Dropdown = ({ label, options, value, onChange, disabled }) => {
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

    return (
        <div className="dropdown-group">
            <div className={`custom-dropdown ${disabled ? "disabled" : ""}`}>
                <button
                    className="dropdown-button"
                    disabled={disabled}
                >
                    {value ? options.find((opt) => opt.value === value).label : label} <img onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)} src="/images/icons/arrow-right.svg" alt=""/>
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