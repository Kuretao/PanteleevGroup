import {InputData, InputDefault} from "../input/Input";
import {useNavigate} from "react-router-dom";


export const OrderHeader = ({selectedOption, inputValue}) =>{
    const navigate = useNavigate();
    return(
        <header className="order-header">
            <div className="order-top">
                <button className="back-btn" onClick={() => navigate(-1)}><img src="/images/icons/back-btn.svg" alt=""/> Вернуться назад</button>
                <h1>Труба в ППУ изоляции</h1>
            </div>

            <div className="order-bottom">
                <img
                    src={selectedOption === "image1" ? "/images/pages/OrderPage/first.png" : "/images/pages/OrderPage/second.png"}
                    alt="Selected Option"
                    className="selected-image"
                />
                <InputData label="Уже в заказе" value={inputValue}/>
            </div>
        </header>
    )
}