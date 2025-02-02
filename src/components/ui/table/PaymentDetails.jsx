import React from "react";

export const PaymentDetails = () => {
    const paymentDetails = {
        bankBranch: "Центральный Банка ВТБ (ПАО) г. Москва",
        bik: "044525411",
        accountNumber: "30101810145250000411",
        inn: "5249125085",
        kpp: "524901001",
        recipientAccount: "4070281018860001343",
        recipient: "Общество с ограниченной ответственностью 'ПАНТЕЛЕЕВ ГРУПП'",
        code: "3К24100000",
        paymentPurpose: "Оплата по заказу клиента №4292",
        invoiceNumber: "4292",
        invoiceDate: "7 октября 2024 г.",
        supplier: "Общество с ограниченной ответственностью 'ПАНТЕЛЕЕВ ГРУПП', ИНН 5249125085, КПП 524901001, 606000, Нижегородская область, г Дзержинск, ул Либкнехта, д. 2, офис 2, тел.: (8313) 23-70-72",
        customer: "ООО 'А-ТИС', ИНН 5256196658, КПП 525601001, 603101, Нижегородская область, г.о. Город Нижний Новгород, г Нижний Новгород, ул Батумгина, дом 11, помещение П5,ОФИС 18, тел.: 8-920-018-30-41",
    };
    return(
        <>
            <div className="payment-details">
                <h3>Образец заполнения платежного поручения</h3>
                <table className="payment-table">
                    <tbody>
                    {/* Первая строка */}
                    <tr>
                        <td rowSpan="2">Банк получателя</td>
                        <td rowSpan="2">
                            <strong>БИК</strong> <br />
                            <strong>Сч. №</strong>
                        </td>
                        <td rowSpan="2" colSpan="3">
                            {paymentDetails.bik} <br />
                            {paymentDetails.accountNumber}
                        </td>
                    </tr>
                    <tr></tr>

                    {/* Вторая строка */}
                    <tr>
                        <div className="fl-col-row">
                            <td style={{borderRight:"1px solid #000"}}><strong>ИНН</strong> {paymentDetails.inn}</td>
                            <td style={{borderRight:"none"}}><strong>КПП</strong> {paymentDetails.kpp}</td>
                        </div>
                        <td><strong>Сч. №</strong></td>
                        <td colSpan="3"> {paymentDetails.recipientAccount}</td>
                    </tr>

                    {/* Третья строка */}
                    <tr>
                        <td rowSpan="2">{paymentDetails.recipient}</td>
                        <td rowSpan="2" width="100px">
                            <strong>Вид оп.</strong> <br />
                            <strong>Наз. пл.</strong> <br />
                            <strong>Код</strong>
                        </td>
                        <td rowSpan="1" width="170px">
                            {paymentDetails.paymentType} <br />
                            {paymentDetails.paymentName} <br />
                            {paymentDetails.code1}
                        </td>
                        <td rowSpan="2" width="100px">
                            <strong>Срок плат.</strong> <br />
                            <strong>Очер. плат.</strong> <br />
                            <strong>Рез. поле</strong>
                        </td>
                        <td width="170px">{paymentDetails.priority}</td>
                    </tr>
                    <tr></tr>

                    {/* Четвертая строка */}
                    <tr>
                        <td colSpan="5">{paymentDetails.paymentPurpose}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            <h2 className="Pay-order">Счет на оплату № {paymentDetails.invoiceNumber} от {paymentDetails.invoiceDate}</h2>
            <hr/>
            <span className="Seller" style={{marginTop: 20}}><p>Поставщик:</p> {paymentDetails.supplier}</span>
            <span className="Seller" style={{marginTop: 14}}><p>Покупатель:</p> {paymentDetails.customer}</span>
        </>
    )
}