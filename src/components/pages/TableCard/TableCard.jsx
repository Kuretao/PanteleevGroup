import "./TableCard.css";
import React from "react";
import {PaymentDetails} from "../../ui/table/PaymentDetails";
import {InvoiceTable} from "../../ui/table/InvoiceTable";
import {TableHeader} from "../../ui/table/TableHeader";
import {Signatures} from "../../ui/table/Signatures";
import {TableBtns} from "../../ui/table/TableBtns";
import axios from "axios";
import Cookies from "js-cookie";



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

    const handleCreateOrder = async () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const username = user.username;
        if (!username) {
            alert("Ошибка: денис убьет!");
            return;
        }
        const savedData = Cookies.get("formData");
        const formData = savedData ? JSON.parse(savedData).data : [];

        const inn = Cookies.get("inn") || "";
        const contactPerson = Cookies.get("contact_person") || "";
        const email = Cookies.get("email") || "";
        const phoneNumber = Cookies.get("phone") || "";

        const orderData = {
            inn: inn,
            contact_person: contactPerson,
            email: email,
            phone_number: phoneNumber,
            order: {
                bankDetails: {
                    bik: paymentDetails.bik,
                    accountNumber: paymentDetails.accountNumber,
                    inn: paymentDetails.inn,
                    kpp: paymentDetails.kpp
                },
                companyDetails: {
                    name: paymentDetails.recipient,
                    address: "606000, Нижегородская область, г Дзержинск, ул Либкнехта, д. 2, офис 2",
                    phone: "(8313) 23-70-72"
                },
                customerDetails: {
                    name: paymentDetails.customer,
                    address: "603101, Нижегородская область, г. Нижний Новгород, ул Батумгина, дом 11",
                    phone: "8-920-018-30-41"
                },
                orderDetails: {
                    number: paymentDetails.invoiceNumber,
                    date: paymentDetails.invoiceDate,
                    items: formData.map((item, index) => ({
                        itemId: index + 1,
                        description: item.selectedGost || "Не указано",
                        quantity: item.quantity || 0,
                        unit: "шт",
                        price: item.steelPipePrice || 0,
                        vatRate: 20,
                        vatAmount: item.shellPrice || 0,
                        total: item.workPayment || 0
                    }))
                }
            }
        };

        try {
            const response = await axios.post(
                `http://176.108.250.117:8000/orders/${username}`,
                orderData,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Заказ создан:", response.data);
            alert("Денис погладит по голове!");
        } catch (error) {
            console.error("Денис накосячил:", error);
            alert("Денис накосячил!");
        }
    };

    return (
        <div className="container table-container">
            <TableHeader/>
            <PaymentDetails paymentDetails={paymentDetails}/>
            <InvoiceTable />
            <hr/>
            <Signatures/>
            <TableBtns handleCreateOrder={handleCreateOrder}  setIsModalOpen={setIsModalOpen} handleSendEmailClick={handleSendEmailClick}/>
        </div>
    );
}