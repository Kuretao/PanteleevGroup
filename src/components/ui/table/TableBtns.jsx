import { ButtonDefault, ButtonWhite } from "../button/Button";
import React, { useState } from "react";

export const TableBtns = ({ setIsModalOpen, handleSendEmailClick }) => {
    const [isSaved, setIsSaved] = useState(false);
    const handleSaveClick = () => {
        setIsSaved(true);
        setIsModalOpen(true);
    };

    return (
        <div className="table-btns">
            {!isSaved && (
                <i onClick={handleSaveClick}>
                    <ButtonDefault buttonDefaultText="Сохранить" propsClass={"table-btn"} />
                </i>
            )}
            {isSaved && (
                <>
                    <ButtonDefault buttonDefaultText="Выгрузить в pdf" propsClass={"table-btn"} />
                    <ButtonWhite buttonWhiteText="Выгрузить в xlsx" propsClass={"table-btn"} />
                    <i onClick={handleSendEmailClick}><ButtonWhite buttonWhiteText="Отправить по почте" propsClass={"table-btn"} /></i>
                </>
            )}
        </div>
    );
};
