import React from "react";
import "./Card.css";
import {ButtonDefault} from "../button/Button";
import "./Card.css";
import { useNavigate} from "react-router-dom";

const Card = ({ image, title }) => {
    const navigate = useNavigate();
    return (
        <div className="card" onClick={() => navigate("/NewOrder")}>
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
