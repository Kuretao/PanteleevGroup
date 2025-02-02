import {ButtonDefault, ButtonWhite} from "../ui/button/Button";
import {NavLink} from "react-router-dom";
import {SearchInput} from "../ui/input/Input";
import "./Header.css";

export const Header = () =>{
    return(
        <header className="Header">
            <NavLink to="/"><ButtonDefault propsClass="smallBtn" buttonDefaultText="Выйти"/></NavLink>
            <NavLink to="/History"><ButtonWhite propsClass="smallBtn" buttonWhiteText="История заказов"/></NavLink>
            <NavLink to="/Main" className="Header__title">Пантелеев групп</NavLink>
            <SearchInput placeholder="Поиск по номеру счета или юр. лицу"/>
        </header>
    )
}