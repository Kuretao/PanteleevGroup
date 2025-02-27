import React, {useEffect, useState} from "react";
import "./ThicknessTable.css";

export const ThicknessTable = ({ options, value, onChange, disabled, title }) => {
    const [isTableOpen, setIsTableOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".thickness-table")) {
                setIsTableOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`thickness-table-container ${disabled ? "disabled" : ""}`}>
            {title && <label className="input-label">{title}</label>}
            <button
                className="dropdown-button table-dropdown-btn"
                onClick={() => !disabled && setIsTableOpen(!isTableOpen)}
                disabled={disabled}
            >
                {value || "Выбрать толщину"} <img className="setting-rotate" onClick={() => !disabled && setIsTableOpen(!isTableOpen)} src="/images/icons/setting.svg" alt=""/>
            </button>
            {isTableOpen && (
                <div className="thickness-table">
                    <h2>{title}</h2>
                    <div className="table-grid">

                        {options.map((option) => (
                            <button
                                key={option}
                                className={`table-cell ${value === option ? "selected" : ""}`}
                                onClick={() => {
                                    onChange(option);
                                    setIsTableOpen(false);
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};