import React, { useState} from "react";
import "./Input.css";
import {Dropdown} from "../dropdown/Dropdown";

export const InputDefault = ({ label, placeholder, type, onChange }) => {
    return(
        <div className="input-container">
            {label && <label className="input-label">{label}</label>}
            <input
                className="input-field"
                type={type}
                placeholder={placeholder}
                //value={value}
                onChange={onChange}
            />
        </div>
    )
}

//
// export const InputOnHide = ({ label, placeholder, type = "text", value, onChange }) => {
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     return(
//         <div className="input-container">
//             {label && <label className="input-label">{label}</label>}
//             <div className="input-field">
//                 <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="Введите пароль"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                     type="button"
//                     className="show-password-btn"
//                     onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? (
//                         <img src="./media/img/log/EyeSlash.svg" alt="alt"/>
//                     ) : (
//                         <img src="./media/img/log/hide.svg" alt="alt"/>
//                     )}
//                 </button>
//             </div>
//         </div>
//     )
// }

export const InputOnPassword = ({ label, labelRep, onChange,password, setPassword }) => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="input-container">
                {label && <label className="input-label">{label}</label>}
                <div className="container-passwords">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="input-field"
                        placeholder="Введите пароль"
                        required
                        value={password}
                        onChange={onChange}
                    />
                    <button
                        type="button"
                        className="show-password-btn"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <img src="/images/icons/eyes.svg" alt="Hide password" />
                        ) : (
                            <img src="/images/icons/eyes.svg" alt="Show password" />
                        )}
                    </button>
                </div>
            </div>

            <div className="input-container">
                {labelRep && <label className="input-label">{labelRep}</label>}
                <div className="container-passwords">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirm-password"
                        className="input-field"
                        placeholder="Повторите пароль"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="show-password-btn"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <img src="/images/icons/eyes.svg" alt="Hide password" />
                        ) : (
                            <img src="/images/icons/eyes.svg" alt="Show password" />
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export const SearchInput = ({ placeholder,   onSearch }) => {
    return (
        <div className="search-input-container">
            <input
                type="text"
                className="search-input-field"
                placeholder={placeholder}
                //value={value}
                //onChange={onChange}
            />

            <img className="search-input-button" onClick={onSearch} src="/images/icons/Search.svg" alt=""/>
        </div>
    );
};

export const InputData = ({label, placeholder,  type = "text",value}) => {
    return(
        <div className="input-container input__data-container">
            {label && <label className="input-label">{label}</label>}
            <input
                className="input-field input__data"
                type={type}
                placeholder={placeholder}
                value={value}
                //onChange={onChange}
            />
        </div>
    )
}

export const TwoInputGroupAndDropdown = ({
                                             label, placeholders, disabled, inputValue, availableShellDiameters, selectedShellDiameter, setSelectedShellDiameter, selectedDiameter
                                         }) => {
    const formattedOptions = availableShellDiameters.map(diameter => ({
        value: diameter,
        label: diameter
    }));


    return (
        <div className={`input-group ${disabled ? "disabled" : ""}`}>
            {label &&
                <div className={`labels`}>
                    {label.map((label) => (
                        <label className="input-label">{label}</label>
                    ))}
                </div>
            }
            <div className="inputs">
                <input
                    type="text"
                    className="input-field input__data"
                    placeholder={placeholders[0]}
                    value={selectedDiameter}

                    disabled={disabled}
                />

                <Dropdown
                    label="Диаметр оболочки"
                    options={formattedOptions} value={selectedShellDiameter} onChange={setSelectedShellDiameter}
                />

                <input
                    type="text"
                    className="input-field input__data"
                    placeholder={placeholders[1]}
                    value={inputValue}

                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export const TwoInputGroup = ({ label, placeholders, onChange, disabled,valueShellWeightPPU, additionalClass }) => {
    return (
        <div className={`input-group ${disabled ? "disabled" : ""} ${additionalClass}`}>
            {label &&
                <div className={`labels ${additionalClass}`}>
                    {label.map((label) => (
                        <label className="input-label">{label}</label>
                    ))}
                </div>
            }
            <div className="inputs">
                {placeholders.map((placeholder, index) => (
                    <input
                        key={index}
                        type="text"
                        className="input-field input__data"
                        placeholder={placeholder}
                        onChange={(e) => onChange(index, e.target.value)}
                        value={valueShellWeightPPU[index]}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
};


export const InputGroup = ({ label, values, onChange, disabled }) => {
    return (
        <div className={`input-group input-group--wrap ${disabled ? "disabled" : ""}`}>
            {values.map((value, index) => (
                <label key={index} className="input-label">
                    {label?.[index] && <span>{label[index]}</span>}
                    <input
                        type="text"
                        className="input-field input__data"
                        placeholder={"#"}
                        value={value}
                        onChange={(e) => onChange(index, e.target.value)}
                        disabled={disabled}
                    />
                </label>
            ))}
        </div>
    );
};