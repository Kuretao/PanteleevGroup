import React from "react";
import "./Card.css";
import {ButtonDefault} from "../button/Button";
import "./Card.css";
import {NavLink} from "react-router-dom";

const Card = ({ image, title, buttonText, onButtonClick }) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt={title} />
            </div>
            <h3 className="card-title">{title}</h3>
            <hr/>
            <NavLink to={"/NewOrder"}><ButtonDefault propsClass="smallBtn" buttonDefaultText="Добавить"/></NavLink>
        </div>
    );
};

export default Card;
