import React, { useState, useEffect } from "react";
import "./OrderPage.css";
import { InputGroup} from "../../ui/input/Input";
import {Dropdown} from "../../ui/dropdown/Dropdown";
import {ThicknessTable} from "../../ui/ThicknessTable/ThicknessTable";
import {ButtonDefault} from "../../ui/button/Button";
import {NavLink} from "react-router-dom";
import {OrderHeader} from "../../ui/OrderPage/OrderHeader";


const VariantBlock = ({ title, children , disabled}) => {
    return (
        <div className={`variant-block ${disabled ? "disabled" : ""}`}>
            <div><div className="left-panel">
                <i></i>
                <span>{title}</span>
                <img className="back-button" src="/images/icons/arrow-right.svg" alt=""/>
            </div></div>
            <div className="right-panel">{children}</div>
        </div>
    );
};

export const NewOrderPage = () => {
    const [selectedOption, setSelectedOption] = useState("image1");
    const [radioOptionsImage, setRadioOptionsImage] = useState([
        { value: "polyethylene", label: "ПЭ (полиэтилен)", checked: false },
        { value: "oc", label: "ОЦ (оцинковка)", checked: false },
    ]);
    const [selectedThickness, setSelectedThickness] = useState(null);
    const [inputValues, setInputValues] = useState(["", "", ""]);
    const [dropdownValue, setDropdownValue] = useState(null);
    const handleRadioChangeImage = (value) => {
        setRadioOptionsImage((prev) =>
            prev.map((option) => ({ ...option, checked: option.value === value }))
        );
        setSelectedOption(value === "polyethylene" ? "image1" : "image2");
    };
    const handleInputChange = (index, value) => {
        setInputValues((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };
    const [stepCompleted, setStepCompleted] = useState({
        dropdown: false,
        thickness: false,
        inputGroup: false,
        CheckBoxGroup: false,
    });
    useEffect(() => {
        setStepCompleted({
            CheckBoxGroup: radioOptionsImage.some(option => option.checked),
            dropdown: dropdownValue !== null && dropdownValue !== "param1",
            thickness: dropdownValue !== null && dropdownValue !== "param1" &&  selectedThickness !== null,
            inputGroup:
                dropdownValue !== null &&
                dropdownValue !== "param1" &&
                selectedThickness !== null &&
                radioOptionsImage.some(option => option.checked) &&
                selectedOption !== null,
        });
    }, [dropdownValue, selectedOption, selectedThickness, inputValues, radioOptionsImage]);

    return (
        <div className="container order-container">
            <OrderHeader selectedOption={selectedOption}/>
            <VariantBlock title="Оболочка" disabled={false}>
                <div className="radio-group">
                    {radioOptionsImage.map((option) => (
                        <label key={option.value}>
                            <input
                                type="checkbox"
                                name="image-toggle"
                                value={option.value}
                                checked={option.checked}
                                onChange={() => handleRadioChangeImage(option.value)}

                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            </VariantBlock>
            <VariantBlock title="ГОСТ стальной трубы" disabled={!stepCompleted.CheckBoxGroup}>
                <Dropdown
                    label="ГОСТ"
                    options={[
                        { value: "param1", label: "Параметр 1", classname: "sphere blue" },
                        { value: "param2", label: "Параметр 2", classname: "sphere gray" },
                        { value: "param3", label: "Параметр 3", classname: "sphere green" },
                        { value: "param4", label: "Параметр 4", classname: "sphere pink" },
                        { value: "param5", label: "Параметр 5", classname: "sphere purple" },
                    ]}
                    value={dropdownValue}
                    onChange={setDropdownValue}
                />
            </VariantBlock>
            {/*<VariantBlock title="Общие настройки" disabled={!stepCompleted.dropdown}>*/}
            {/*    <h3>Общие настройки:</h3>*/}
            {/*    {generalOptions.map((option) => (*/}
            {/*        <label key={option.value}>*/}
            {/*            <input*/}
            {/*                type="checkbox"*/}
            {/*                value={option.value}*/}
            {/*                checked={option.checked}*/}
            {/*                onChange={() => handleGeneralChange(option.value)}*/}

            {/*            />*/}
            {/*            {option.label}*/}
            {/*        </label>*/}
            {/*    ))}*/}
            {/*</VariantBlock>*/}
            <VariantBlock title="Толщина стенки" disabled={!stepCompleted.dropdown}>
                <ThicknessTable
                    options={["10", "20", "30", "40", "50", "60","10", "20", "30", "40", "50", "60"]}
                    value={selectedThickness}
                    onChange={(value) => setSelectedThickness(value)}
                    title="Толщина стенки"
                />
            </VariantBlock>
            <VariantBlock title="Погонный метр по заказу" disabled={!stepCompleted.inputGroup}>
                <InputGroup
                    label="Сколько нужно метров"
                    placeholders={["Введите количество", "Масса", "Максимально весь заказ"]}
                    onChange={handleInputChange}
                />
            </VariantBlock>

            <div className="order-btns">
                <NavLink to={"/Category"}><ButtonDefault buttonDefaultText={"Добавить еще позицию"}/></NavLink>
                <NavLink to={"/Table"}><ButtonDefault buttonDefaultText={"Посмотреть накладную"}/></NavLink>
            </div>
        </div>
    );
};
