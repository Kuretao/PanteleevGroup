import React, { useState, useEffect } from "react";
import "./OrderPage.css";
import {InputData, InputDefault, InputGroup, TwoInputGroup} from "../../ui/input/Input";
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
            <VariantBlock title={"Стальная труба"} disabled={false}>
                <InputDefault label={"Цена за 1 тонну в рублях"} placeholder={"Введите цену"}/>
            </VariantBlock>
            <VariantBlock title="ГОСТ стальной трубы" disabled={!stepCompleted.CheckBoxGroup}>
                <Dropdown
                    label="ГОСТ"
                    options={[
                        { value: "param1", label: "10704/10705", classname: "sphere blue" },
                        { value: "param2", label: "8732", classname: "sphere gray" },
                        { value: "param3", label: "3262", classname: "sphere green" },
                    ]}
                    value={dropdownValue}
                    onChange={setDropdownValue}
                />
            </VariantBlock>
            <VariantBlock title="Марка стали" disabled={!stepCompleted.CheckBoxGroup}>
                <Dropdown
                    label="ГОСТ"
                    options={[
                        { value: "param1", label: "Ст2", classname: "sphere blue" },
                        { value: "param2", label: "Ст3", classname: "sphere gray" },
                        { value: "param3", label: "Ст20", classname: "sphere green" },
                        { value: "Ст09Г2С", label: "Параметр 4", classname: "sphere pink" },
                        { value: "param5", label: "Ст17Г1С", classname: "sphere purple" },
                        { value: "param6", label: "12х19н10т", classname: "sphere purple" },
                    ]}
                    value={dropdownValue}
                    onChange={setDropdownValue}
                />
            </VariantBlock>
            <VariantBlock title="Диаметр трубы D" disabled={!stepCompleted.dropdown}>
                <ThicknessTable
                    options={["32", "38", "45", "40", "50", "60","10", "20", "30", "40", "50", "60"]}
                    value={selectedThickness}
                    onChange={(value) => setSelectedThickness(value)}
                    title="Диаметр трубы D"
                />
            </VariantBlock>
            <VariantBlock title="Толщина стенки S" disabled={!stepCompleted.dropdown}>
                <ThicknessTable
                    options={["10", "20", "30", "40", "50", "60","10", "20", "30", "40", "50", "60"]}
                    value={selectedThickness}
                    onChange={(value) => setSelectedThickness(value)}
                    title="Толщина стенки S"
                />
            </VariantBlock>
            <VariantBlock title="Погонный метр по заказу" disabled={!stepCompleted.inputGroup}>
                <InputGroup
                    label="Сколько нужно метров"
                    placeholders={["Введите количество", "Масса", "Максимально весь заказ"]}
                    onChange={handleInputChange}
                />
            </VariantBlock>
            <VariantBlock title={"Оболочка"} disabled={!stepCompleted.inputGroup}>
                <InputData label={"Цена за 1 кг в рублях"} placeholder={"Введите цену"}/>
            </VariantBlock>
            <VariantBlock title="Диаметр оболочки D" disabled={!stepCompleted.inputGroup}>
                <TwoInputGroup
                    label="диаметр оболочки"
                    labelSecond="вес справочно"
                    placeholders={["#", "#"]}
                    onChange={handleInputChange}
                />
            </VariantBlock>
            <VariantBlock title={"Длина оболочки"} disabled={!stepCompleted.inputGroup}>
                <InputData label={"Цена за 1кг в рублях"} placeholder={"#"}/>
            </VariantBlock>
            <VariantBlock title="Вес справочно ППУ" disabled={!stepCompleted.inputGroup}>
                <TwoInputGroup
                    label="вес справочно"
                    labelSecond="Цена за 1кг в рублях"
                    placeholders={["#", "#"]}
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
