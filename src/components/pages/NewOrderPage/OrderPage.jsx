import React, { useState, useEffect } from "react";
import "./OrderPage.css";
import {InputData,  InputGroup,  TwoInputGroupAndDropdown} from "../../ui/input/Input";
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
    const [inputValues, setInputValues] = useState(["", "", ""]);
    const [dropdownValue, setDropdownValue] = useState(null);

    const [selectedGost, setSelectedGost] = useState(null);
    const [availableDiameters, setAvailableDiameters] = useState([]);
    const [selectedDiameter, setSelectedDiameter] = useState(null);
    const [availableThickness, setAvailableThickness] = useState([]);
    const [selectedThickness, setSelectedThickness] = useState(null);
    const [pipeMass, setPipeMass] = useState(0);
    const [quantity, setQuantity] = useState("");
    const [totalWeight, setTotalWeight] = useState("");
    const [availableShellDiameters, setAvailableShellDiameters] = useState([]);
    const [selectedShellDiameter, setSelectedShellDiameter] = useState(null);
    const [shellWeight, setShellWeight] = useState(0);
    const [shellWeightPPU, setShellWeightPPU] = useState(0);

    useEffect(() => {
        if (selectedGost === "10704/10705" || selectedGost === "8732") {
            setAvailableDiameters(["38", "45"]);
        } else if (selectedGost === "3262") {
            setAvailableDiameters(["15", "20"]);
        } else {
            setAvailableDiameters([]);
        }
        setSelectedDiameter(null);
        setSelectedThickness(null);
        setPipeMass(0);
        setTotalWeight("");
    }, [selectedGost]);

    useEffect(() => {
        if (selectedDiameter === "38") {
            setAvailableThickness(["1.2", "1.4"]);
        } else if (selectedDiameter === "45") {
            setAvailableThickness(["1.2", "1.4"]);
        } else if (selectedDiameter === "15" || selectedDiameter === "20") {
            setAvailableThickness(["2.5", "2.8"]);
        } else {
            setAvailableThickness([]);
        }
        setSelectedThickness(null);
        setPipeMass(0);
        setTotalWeight("");
    }, [selectedDiameter]);

    useEffect(() => {
        const massTable = {
            "38-1.2": 1.09,
            "38-1.4": 1.26,
            "45-1.2": 1.30,
            "45-1.4": 1.51,
            "15-2.5": 1.16,
            "15-2.8": 1.28,
        };

        const key = `${selectedDiameter}-${selectedThickness}`;
        setPipeMass(massTable[key] || 0);
    }, [selectedDiameter, selectedThickness]);

    useEffect(() => {
        if (selectedDiameter === "38" && selectedThickness === "1.2") {
            setAvailableShellDiameters(["110", "125"]);
        }else if(selectedDiameter === "38" && selectedThickness === "1.4") {
            setAvailableShellDiameters(["110", "125"]);
        } else if (selectedDiameter === "45" && selectedThickness === "1.2") {
            setAvailableShellDiameters(["125"]);
        }else if (selectedDiameter === "45" && selectedThickness === "1.4") {
            setAvailableShellDiameters(["125"]);
        } else {
            setAvailableShellDiameters([]);
        }
        setSelectedShellDiameter(null);
        setShellWeight(0);
    }, [selectedDiameter, selectedThickness]);

    useEffect(() => {
        if (availableShellDiameters.length > 0) {
            setSelectedShellDiameter(availableShellDiameters[0]);
        }
    }, [availableShellDiameters]);


    useEffect(() => {
        const shellMassTable = {
            "110-38-1.2": 0.515,
            "125-38-1.2": 0.515,
            "125-38-1.4": 0.699,
            "125-45-1.2": 0.667,
            "125-45-1.4": 0.667,
        };

        const key = `${selectedShellDiameter}-${selectedDiameter}-${selectedThickness}`;
        setShellWeight(shellMassTable[key] || 0);
        console.log("availableShellDiameters", availableShellDiameters);
        console.log("selectedShellDiameter", selectedShellDiameter);
        console.log("shellWeight", shellWeight);
    }, [selectedShellDiameter, selectedDiameter, selectedThickness, availableShellDiameters,  shellWeight]);

    useEffect(() => {
        console.log("selectedShellDiameter:", selectedShellDiameter);
        console.log("Lookup key:", `${selectedShellDiameter}-${selectedDiameter}-${selectedThickness}`);

        const shellMassTablePPU = {
            "110-38-1.2": 0.515,
            "125-38-1.4": 0.699,
            "125-45-1.2": 0.667,
            "125-45-1.4": 0.667,
        };

        const key = `${selectedShellDiameter}-${selectedDiameter}-${selectedThickness}`;
        setShellWeightPPU(shellMassTablePPU[key] || 0);
    }, [selectedShellDiameter, selectedDiameter, selectedThickness]);

    const handleRadioChangeImage = (value) => {
        setRadioOptionsImage((prev) =>
            prev.map((option) => ({ ...option, checked: option.value === value }))
        );
        setSelectedOption(value === "polyethylene" ? "image1" : "image2");
    };
    const handleInputChange = (index, value) => {
        if (index === 0) {
            setQuantity(value);
            const weight = parseFloat(value) * pipeMass;
            setTotalWeight(weight ? weight.toFixed(2) : "");
        }
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
            dropdown: selectedGost !== null,
            thickness: selectedGost !== null && selectedDiameter !== null && selectedThickness !== null,
            inputGroup:
                selectedGost !== null &&
                selectedDiameter !== null &&
                selectedThickness !== null &&
                radioOptionsImage.some(option => option.checked) &&
                selectedOption !== null,
        });
    }, [selectedGost, selectedDiameter, selectedThickness, selectedOption, inputValues, radioOptionsImage]);

    return (
        <div className="container order-container">
            <OrderHeader selectedOption={selectedOption} inputValue={`Труба ст.эсв ${"(ГОСТ " + selectedGost + ' ' + dropdownValue + ")" }`}/>
            <VariantBlock title="Оболочка" >
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
            <VariantBlock title={"Стальная труба"} >
                <InputData label={"Цена за 1 тонну в рублях"} placeholder={"Введите цену"}/>
            </VariantBlock>
            <VariantBlock title="ГОСТ стальной трубы" >
                <Dropdown
                    zIndex="100"
                    label="ГОСТ"
                    options={[
                        { value: "10704/10705", label: "10704/10705", classname: "sphere blue" },
                        { value: "8732", label: "8732", classname: "sphere gray" },
                        { value: "3262", label: "3262", classname: "sphere green" },
                    ]}
                    value={selectedGost}
                    onChange={setSelectedGost}
                />
            </VariantBlock>
            <VariantBlock title="Марка стали" >
                <Dropdown
                    zIndex="10"
                    label="Марка стали"
                    options={[
                        { value: "Ст2", label: "Ст2", classname: "sphere blue" },
                        { value: "Ст3", label: "Ст3", classname: "sphere gray" },
                        { value: "Ст20", label: "Ст20", classname: "sphere green" },
                        { value: "Ст09Г2С", label: "Ст09Г2С", classname: "sphere pink" },
                        { value: "Ст17Г1С", label: "Ст17Г1С", classname: "sphere purple" },
                        { value: "12х19н10т", label: "12х19н10т", classname: "sphere purple" },
                    ]}
                    value={dropdownValue}
                    onChange={setDropdownValue}
                />
            </VariantBlock>
            <VariantBlock title="Диаметр трубы D" >
                <ThicknessTable
                    options={availableDiameters}
                    value={selectedDiameter}
                    onChange={setSelectedDiameter}
                    title="Диаметр трубы D"
                />
            </VariantBlock>
            <VariantBlock title="Толщина стенки S" >
                <ThicknessTable
                    options={availableThickness}
                    value={selectedThickness}
                    onChange={setSelectedThickness}
                    title="Толщина стенки S"
                />
            </VariantBlock>
            <VariantBlock title="Погонный метр по заказу" >
                <InputGroup
                    label={["Сколько нужно метров", "Масса 1 шт", "Cправочно весь заказ"]}
                    values={[quantity, pipeMass.toString(), totalWeight]}
                    onChange={handleInputChange}
                />
            </VariantBlock>
            <VariantBlock title={"Оболочка"} >
                <InputData label={"Цена за 1 кг в рублях"} placeholder={"Введите цену"}/>
            </VariantBlock>
            <VariantBlock title="Диаметр оболочки D">
                <TwoInputGroupAndDropdown
                    label={["диаметр ст. трубы",  "Диаметр оболочки", "Вес справочно"]}
                    placeholders={["#", "#"]}
                    onChange={() => {}}
                    disabled={availableShellDiameters.length === 0}
                    dropdownOptions={availableShellDiameters}
                    dropdownValue={selectedShellDiameter}
                    onDropdownChange={setSelectedShellDiameter}
                    inputValue={shellWeight.toString()}
                    availableShellDiameters={availableShellDiameters}
                    selectedShellDiameter={selectedShellDiameter}
                    setSelectedShellDiameter={setSelectedShellDiameter}
                    selectedDiameter={selectedDiameter}
                />
            </VariantBlock>
            <VariantBlock title={"Длина оболочки "} >
                <InputData label={"длина оболочки весь заказ"} value={"Сколько метров столько и будет"} placeholder={"#"}/>
            </VariantBlock>
            {/*<VariantBlock title="Вес справочно ППУ" >*/}
            {/*    <TwoInputGroup*/}
            {/*        additionalClass="max-content"*/}
            {/*        label={["Цена за 1кг в рублях", "вес справочно"]}*/}
            {/*        placeholders={["Сделаем на бэке","#", ]}*/}
            {/*        onChange={handleInputChange}*/}
            {/*        valueShellWeightPPU={["", shellWeightPPU]}*/}
            {/*    />*/}
            {/*</VariantBlock>*/}
            <VariantBlock title="Вес справочно ППУ" >
                <InputGroup
                    label={["Цена за 1кг в рублях", "Вес справочно 1 п.м", "Масса Cправочно весь заказ"]}
                    values={[quantity, shellWeightPPU, totalWeight]}
                    onChange={handleInputChange}
                />
            </VariantBlock>

            <VariantBlock title={"Работа"} >
                <InputData label={"Оплата работы сотрудников"} placeholder={"#"}/>
            </VariantBlock>

            <VariantBlock title="Компоненты" >
                <InputGroup
                    label={["ПРОВОЛОКА", "деталь 2", "деталь 3", "деталь 4", "деталь 5", "общая цена"]}
                    values={[quantity, quantity, quantity,quantity,quantity,quantity,]}
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
