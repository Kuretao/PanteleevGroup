import React from "react";
import "./Card.css";
import {ButtonDefault} from "../button/Button";
import { useNavigate} from "react-router-dom";

const Card = ({ image, title }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (title === "Отвод в ППУ изоляции") {
            navigate("/NewOrderOtvod", { state: { title } });
        } else {
            navigate("/NewOrder", { state: { title } });
        }
    };
    return (
        <div className="card" onClick={handleClick}>
            <div className="card-image">
                <img src={image} alt={title} />
            </div>
            <h3 className="card-title">{title}</h3>
            <hr/>
            <ButtonDefault propsClass="smallBtn" buttonDefaultText="Добавить"/>
        </div>
    );
};

export default Card;
