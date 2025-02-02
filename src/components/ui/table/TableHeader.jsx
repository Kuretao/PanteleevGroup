import React from "react";

export const TableHeader = () => {
    return(
        <header className="table-header">
            <button className="back-btn"><img src="/images/icons/back-btn.svg" alt=""/> Назад</button>
            <img src="/images/image/logo-big.png" alt=""/>
            <div className="alert">Внимание! Счет действителен до 07.10.2024.
                Оплата данного счета означает согласие с условиями поставки товара.
                Уведомление об оплате обязательно, в противном случае не гарантируется
                наличие товара на складе. Товар отпускается по факту прихода денег
                на р/с Поставщика, самовывозом, при наличии доверенности и паспорта.</div>
        </header>
    )
}