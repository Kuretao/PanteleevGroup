import React, {useState} from "react";
import "./Input.css";

export const InputDefault = ({ label, placeholder, type = "text", value, onChange }) => {
    return(
        <div className="input-container">
            {label && <label className="input-label">{label}</label>}
            <input
                className="input-field"
                type={type}
                placeholder={placeholder}
                //value={value}
                //onChange={onChange}
            />
        </div>
    )
}

export const InputOnHide = ({ label, placeholder, type = "text", value, onChange }) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    return(
        <div className="input-container">
            {label && <label className="input-label">{label}</label>}
            <div className="input-field">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Введите пароль"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <img src="./media/img/log/EyeSlash.svg" alt="alt"/>
                    ) : (
                        <img src="./media/img/log/hide.svg" alt="alt"/>
                    )}
                </button>
            </div>
        </div>
    )
}

export const InputOnPassword = ({ label, labelRep }) => {
    const [password, setPassword] = useState("");
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
                        onChange={(e) => setPassword(e.target.value)}
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

export const SearchInput = ({ placeholder, value, onChange, onSearch }) => {
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

export const InputData = ({label, placeholder,  type = "text"}) => {
    return(
        <div className="input-container input__data-container">
            {label && <label className="input-label">{label}</label>}
            <input
                className="input-field input__data"
                type={type}
                placeholder={placeholder}
                //value={value}
                //onChange={onChange}
            />
        </div>
    )
}

export const TwoInputGroup = ({ label, labelSecond, placeholders, onChange, disabled }) => {
    return (
        <div className={`input-group ${disabled ? "disabled" : ""}`}>
            <div className="labels">
                {label && <label className="input-label">{label}</label>}
                {labelSecond && <label className="input-label">{labelSecond}</label>}
            </div>
            <div className="inputs">
                {placeholders.map((placeholder, index) => (
                    <input
                        key={index}
                        type="text"
                        className="input-field input__data"
                        placeholder={placeholder}
                        onChange={(e) => onChange(index, e.target.value)}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
};


export const InputGroup = ({ label, placeholders, onChange, disabled }) => {
    return (
        <div className={`input-group ${disabled ? "disabled" : ""}`}>
            {label && <label className="input-label">{label}</label>}
            <div className="inputs">
                {placeholders.map((placeholder, index) => (
                    <input
                        key={index}
                        type="text"
                        className="input-field input__data"
                        placeholder={placeholder}
                        onChange={(e) => onChange(index, e.target.value)}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
};