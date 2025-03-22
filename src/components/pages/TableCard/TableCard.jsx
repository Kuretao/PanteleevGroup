import "./TableCard.css";
import React from "react";
import {PaymentDetails} from "../../ui/table/PaymentDetails";
import {InvoiceTable} from "../../ui/table/InvoiceTable";
import {TableHeader} from "../../ui/table/TableHeader";
import {Signatures} from "../../ui/table/Signatures";
import {TableBtns} from "../../ui/table/TableBtns";


export  const TableCard = ({setIsModalOpen,handleSendEmailClick}) =>{
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
    const data = [
        { name: "Труба ОЦ сталь ГОСТ 10704 ТПТ ППУ", quantity: 78, weight: "пог. м", volume: "", price: 3830.0, vatRate: 20, vatAmount: 49790.0, total: 298740.0 },
        { name: "Труба ОЦ сталь ГОСТ 10704 ТПТ ППУ", quantity: 78, weight: "пог. м", volume: "", price: 1880.0, vatRate: 20, vatAmount: 24440.0, total: 146640.0 },
        { name: "Отвод ОЦ 90° ТСГ ППУ", quantity: 11, weight: "шт", volume: "", price: 9570.0, vatRate: 20, vatAmount: 17545.0, total: 105270.0 },
        { name: "Укор", quantity: 10, weight: "шт", volume: "", price: 4700.0, vatRate: 20, vatAmount: 7833.33, total: 47000.0 }
    ];
    return (
        <div className="container table-container">
            <TableHeader/>
            <PaymentDetails paymentDetails={paymentDetails}/>
            <InvoiceTable data={data}/>
            <hr/>
            <Signatures/>
            <TableBtns setIsModalOpen={setIsModalOpen} handleSendEmailClick={handleSendEmailClick}/>
        </div>
    );
}