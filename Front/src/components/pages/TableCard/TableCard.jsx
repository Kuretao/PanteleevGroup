import "./TableCard.css";
import React from "react";
import {PaymentDetails} from "../../ui/table/PaymentDetails";
import {InvoiceTable} from "../../ui/table/InvoiceTable";
import {TableHeader} from "../../ui/table/TableHeader";
import {Signatures} from "../../ui/table/Signatures";
import {TableBtns} from "../../ui/table/TableBtns";


export  const TableCard = ({setIsModalOpen,handleSendEmailClick}) =>{
    return (
        <div className="container table-container">
            <TableHeader/>
            <PaymentDetails/>
            <InvoiceTable/>
            <hr/>
            <Signatures/>
            <TableBtns setIsModalOpen={setIsModalOpen} handleSendEmailClick={handleSendEmailClick}/>
        </div>
    );
}