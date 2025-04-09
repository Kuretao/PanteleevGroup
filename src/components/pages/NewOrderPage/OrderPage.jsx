import React, { useState, useEffect } from "react";
import "./OrderPage.css";
import {InputData,  InputGroup,  TwoInputGroupAndDropdown} from "../../ui/input/Input";
import {Dropdown} from "../../ui/dropdown/Dropdown";
import {ThicknessTable} from "../../ui/ThicknessTable/ThicknessTable";
import {ButtonDefault} from "../../ui/button/Button";
import {NavLink, useLocation} from "react-router-dom";
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

export const setCookieObject = (name, obj, days = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(obj))}; expires=${expires.toUTCString()}; path=/`;
};

export const getCookieObject = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(row => row.startsWith(`${name}=`));
    return cookie ? JSON.parse(decodeURIComponent(cookie.split("=")[1])) : null;
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
    const [steelPipePrice, setSteelPipePrice] = useState("");
    const [shellPrice, setShellPrice] = useState("");
    const [workPayment, setWorkPayment] = useState("");
    const location = useLocation();
    const title = location.state?.title || "Ошибка";
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
        const updatedRadioOptions = radioOptionsImage.map((option) => ({
            ...option,
            checked: option.value === value,
        }));
        setRadioOptionsImage(updatedRadioOptions);
        setSelectedOption(value === "polyethylene" ? "image1" : "image2");
        // updateCookieData("radioOptionsImage", updatedRadioOptions);
        // updateCookieData("selectedOption", value === "polyethylene" ? "image1" : "image2");
    };

    const handleInputChange = (index, newValue) => {
        if (index === 0) {
            setQuantity(newValue);
            // updateCookieData("quantity", newValue);
            const weight = parseFloat(newValue) * pipeMass;
            const newTotalWeight = weight ? weight.toFixed(2) : "";
            setTotalWeight(newTotalWeight);
            // updateCookieData("totalWeight", newTotalWeight);
        }
    };

    useEffect(() => {
        const savedData = getCookieObject("formData");
        if (savedData) {
            if (savedData.selectedOption !== undefined) setSelectedOption(savedData.selectedOption);
            if (savedData.radioOptionsImage !== undefined) setRadioOptionsImage(savedData.radioOptionsImage);
            if (savedData.inputValues !== undefined) setInputValues(savedData.inputValues);
            if (savedData.dropdownValue !== undefined) setDropdownValue(savedData.dropdownValue);
            if (savedData.selectedGost !== undefined) setSelectedGost(savedData.selectedGost);
            if (savedData.availableDiameters !== undefined) setAvailableDiameters(savedData.availableDiameters);
            if (savedData.selectedDiameter !== undefined) setSelectedDiameter(savedData.selectedDiameter);
            if (savedData.availableThickness !== undefined) setAvailableThickness(savedData.availableThickness);
            if (savedData.selectedThickness !== undefined) setSelectedThickness(savedData.selectedThickness);
            if (savedData.pipeMass !== undefined) setPipeMass(savedData.pipeMass);
            if (savedData.quantity !== undefined) setQuantity(savedData.quantity);
            if (savedData.totalWeight !== undefined) setTotalWeight(savedData.totalWeight);
            if (savedData.availableShellDiameters !== undefined) setAvailableShellDiameters(savedData.availableShellDiameters);
            if (savedData.selectedShellDiameter !== undefined) setSelectedShellDiameter(savedData.selectedShellDiameter);
            if (savedData.shellWeight !== undefined) setShellWeight(savedData.shellWeight);
            if (savedData.shellWeightPPU !== undefined) setShellWeightPPU(savedData.shellWeightPPU);
            if (savedData.steelPipePrice !== undefined) setSteelPipePrice(savedData.steelPipePrice);
            if (savedData.shellPrice !== undefined) setShellPrice(savedData.shellPrice);
            if (savedData.workPayment !== undefined) setWorkPayment(savedData.workPayment);
        }
    }, []);

    const updateCookieData = (key, value) => {
        const savedData = getCookieObject("formData") || {};
        savedData[key] = value;
        setCookieObject("formData", savedData);
    };



    const handleGostChange = (value) => {
        setSelectedGost(value);
        // updateCookieData("selectedGost", value);
    };


    const handleDropdownChange = (value) => {
        setDropdownValue(value);
        // updateCookieData("dropdownValue", value);
    };


    const handleDiameterChange = (value) => {
        setSelectedDiameter(value);
        // updateCookieData("selectedDiameter", value);
    };


    const handleThicknessChange = (value) => {
        setSelectedThickness(value);
        // updateCookieData("selectedThickness", value);
    };


    const handleShellDiameterChange = (value) => {
        setSelectedShellDiameter(value);
        // updateCookieData("selectedShellDiameter", value);
    };


    const handleAddNewPosition = () => {
        let savedData = getCookieObject("formData");
        if (!savedData || !Array.isArray(savedData.data)) {
            savedData = { data: [] };
        }
        const newPosition = {
            selectedGost,
            dropdownValue,
            selectedDiameter,
            selectedThickness,
            quantity,
            totalWeight,
            selectedShellDiameter,
            shellWeight,
            shellWeightPPU,
            steelPipePrice,
            shellPrice,
            workPayment
        };
        savedData.data.push(newPosition);
        setCookieObject("formData", savedData);
        setSelectedGost(null);
        setDropdownValue(null);
        setSelectedDiameter(null);
        setSelectedThickness(null);
        setQuantity("");
        setTotalWeight("");
        setSelectedShellDiameter(null);
        setShellWeight(0);
        setShellWeightPPU(0);
        setSteelPipePrice("");
        setShellPrice("");
        setWorkPayment("");

        console.log("Добавлена новая позиция:", newPosition);
    };


    const col = () =>{
        console.log(getCookieObject("formData"))
    }




    return (
        <div className="container order-container">
            <OrderHeader selectedOption={selectedOption} title={title} inputValue={`Труба ст.эсв ${"(ГОСТ " + selectedGost + ' ' + dropdownValue + ")" }`}/>
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
                <InputData label={"Цена за 1 тонну в рублях"} placeholder={"Введите цену"}    onChange={(val) => {setSteelPipePrice(val);  updateCookieData("steelPipePrice", val); }}/>{/* выбор сохраняем в куки*/}
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
                    onChange={handleGostChange}
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
                    onChange={handleDropdownChange}
                />
            </VariantBlock>
            <VariantBlock title="Диаметр трубы D" >
                <ThicknessTable
                    options={availableDiameters}
                    value={selectedDiameter}
                    onChange={handleDiameterChange}
                    title="Диаметр трубы D"
                />
            </VariantBlock>
            <VariantBlock title="Толщина стенки S" >
                <ThicknessTable
                    options={availableThickness}
                    value={selectedThickness}
                    onChange={handleThicknessChange}
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
                <InputData label={"Цена за 1 кг в рублях"} placeholder={"Введите цену"}    value={shellPrice}
                           onChange={(val) => {
                               setShellPrice(val);
                               updateCookieData("shellPrice", val);
                           }}/>
            </VariantBlock>
            <VariantBlock title="Диаметр оболочки D">
                <TwoInputGroupAndDropdown
                    label={["диаметр ст. трубы",  "Диаметр оболочки", "Вес справочно"]}
                    placeholders={["#", "#"]}
                    onChange={() => {}}
                    disabled={availableShellDiameters.length === 0}
                    dropdownOptions={availableShellDiameters}
                    dropdownValue={selectedShellDiameter}
                    onDropdownChange={handleShellDiameterChange}
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

            <VariantBlock title="Вес справочно ППУ" >
                <InputGroup
                    label={["Цена за 1кг в рублях", "Вес справочно 1 п.м", "Масса Cправочно весь заказ"]}
                    values={[quantity, shellWeightPPU, totalWeight]}
                    onChange={handleInputChange}
                />
            </VariantBlock>

            <VariantBlock title={"Работа"} >
                <InputData label={"Оплата работы сотрудников"} placeholder={"#"}    onChange={(val) => {
                    setWorkPayment(val);
                    updateCookieData("workPayment", val);
                }}/>
            </VariantBlock>

            <VariantBlock title="Компоненты">
                <InputGroup
                    label={["ПРОВОЛОКА", "деталь 2", "деталь 3", "деталь 4", "деталь 5", "общая цена"]}
                    values={[quantity, quantity, quantity,quantity,quantity,quantity,]}
                    onChange={handleInputChange}
                />
            </VariantBlock>

            <div className="order-btns" onClick={col}>
                {/*<NavLink to={"/Category"}></NavLink>*/}
                <ButtonDefault onClick={handleAddNewPosition} buttonDefaultText={"Добавить еще позицию"}/>
                <NavLink to={"/Table"} ><ButtonDefault buttonDefaultText={"Посмотреть накладную"}/></NavLink>
            </div>
        </div>
    );
};
