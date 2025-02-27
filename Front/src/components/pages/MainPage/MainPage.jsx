import {InputData} from "../../ui/input/Input";
import "./MainPage.css";
import {NavLink} from "react-router-dom";
import {ButtonDefault} from "../../ui/button/Button";

const MainHead = () =>{
    return(
        <div className="Main__Head">
            <InputData label="ИНН" placeholder="введите инн"/>
            <InputData label="контактное лицо" placeholder="введите имя и фамилию"/>
            <InputData label="Почта" placeholder="введите почту"/>
            <InputData label="Телефон для связи" placeholder="введите телефон"/>
            <NavLink to="/Category" style={{height: 46}}><ButtonDefault propsClass="smallBtn hg" buttonDefaultText="Создать новый заказ"/></NavLink>
        </div>
    )
}

export const MainBody = () =>{
    return(
        <main className="MainPage__main">
            <img src="/images/image/MainPage__main.png" alt="img__main" className="img__main"/>

            <div className="main-title__container">
                <h1>Для начала работы введите <br/> данные компании</h1>
                <span className="main__subtitle">заполните поля наверху и нажмите <br/> “Создать новый заказ”</span>
            </div>
        </main>
    )
}

export const MainPage = () =>{
    return(
        <section className="container" style={{marginTop: 24}}>
            <MainHead/>
            <MainBody/>
        </section>
    )
}