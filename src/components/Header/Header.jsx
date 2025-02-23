import {ButtonDefault, ButtonWhite} from "../ui/button/Button";
import {NavLink} from "react-router-dom";
import {SearchInput} from "../ui/input/Input";
import "./Header.css";

export const Header = () =>{

    return(
        <header className="Header">
            <NavLink to="/Main" className="Header__title"><img src="/images/image/Logotype.png" alt=""/> Пантелеев групп</NavLink>
            <SearchInput placeholder="Поиск по номеру счета или юр. лицу"/>
            <div className="header-btns" >
                <NavLink to="/History"><ButtonWhite propsClass="smallBtn" buttonWhiteText="История заказов"/></NavLink>
                <NavLink to="/"><ButtonDefault propsClass="smallBtn" buttonDefaultText="Выйти"/></NavLink>
            </div>
        </header>
    )
}