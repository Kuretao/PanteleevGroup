import { InputDataCookie} from "../../ui/input/Input";
import "./MainPage.css";
import {NavLink} from "react-router-dom";
import { useState } from "react";
import {ButtonDefault} from "../../ui/button/Button";
import {DropdownCookie} from "../../ui/dropdown/Dropdown";
import React from "react";
import Cookies from "js-cookie";

const MainHead = ({ dropdownValue, setDropdownValue }) => {
    return(
        <div className="Main__Head">
            <DropdownCookie
                zIndex="100"
                label="ИНН"
                value={dropdownValue}
                onChange={setDropdownValue}
                options={[
                    { value: "10704/10705", label: "10704/10705", classname: "sphere blue" },
                    { value: "8732", label: "8732", classname: "sphere gray" },
                    { value: "3262", label: "3262", classname: "sphere green" },
                ]}
            />
            <InputDataCookie label="контактное лицо" placeholder="введите имя и фамилию"/>
            <InputDataCookie label="Почта" placeholder="введите почту"/>
            <InputDataCookie label="Телефон для связи" placeholder="введите телефон"/>
            <NavLink to="/Category" style={{height: 46}}>
                <ButtonDefault propsClass="smallBtn hg" buttonDefaultText="Создать новый заказ"/>
            </NavLink>
        </div>
    )
}
const AdditionalInputs = () => {
    return (
        <div className="AdditionalInputs">
            <InputDataCookie label="Юридическое лицо" placeholder="Ввод"/>
            <InputDataCookie label="ИНН" placeholder="Ввод"/>
            <InputDataCookie label="КПП" placeholder="Ввод"/>
            <InputDataCookie label="Индекс" placeholder="Ввод"/>
            <InputDataCookie label="Телефон" placeholder="Ввод"/>
            <InputDataCookie label="Полный адрес" placeholder="Ввод"/>
        </div>
    )
}

export const MainBody = () =>{
    return(
        <main className="MainPage__main">
            {/*<img src="/images/image/MainPage__main.png" alt="img__main" className="img__main"/>*/}

            <div className="main-title__container">
                <h1>Для начала работы введите <br/> данные компании</h1>
                <span className="main__subtitle">заполните поля наверху и нажмите <br/> “Создать новый заказ”</span>
            </div>
        </main>
    )
}

export const MainPage = () =>{
    const [dropdownValue, setDropdownValue] = useState(Cookies.get("inn") || "");
    return(
        <section className="container" style={{marginTop: 24}}>
            <MainHead dropdownValue={dropdownValue} setDropdownValue={setDropdownValue} />
            {dropdownValue === "add" && <AdditionalInputs />}
            <MainBody/>
        </section>
    )
}