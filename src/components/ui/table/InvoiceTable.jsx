import React, {useEffect, useState} from "react";
import {getCookieObject} from "../../pages/NewOrderPage/OrderPage";
import Cookies from "js-cookie";

export const InvoiceTable = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        const savedData = getCookieObject("formData");

        if (savedData && Array.isArray(savedData.data)) {
            setData(savedData.data);
        }
    }, []);

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
        Cookies.set("formData", JSON.stringify({ data: updatedData }));
    };

    if (!Array.isArray(data)) {
        console.error("InvoiceTable: data is not an array", data);
        return <p>Ошибка загрузки данных</p>;
    }
    const result = data.reduce((acc, item) => {
        acc.totalQuantity += item.quantity;
        acc.totalSum += item.total;
        return acc;
    }, { totalQuantity: 0, totalSum: 0 });
    const formattedResult = `Всего наименований ${data.length}, на сумму ${result.totalSum.toLocaleString()} руб.`;
    const total = 597650.0;
    const vat = 99608.33;
    const grandTotal = 597650.0;
    const numToWordsRu = (num) => {
        if (!num || isNaN(num)) return "ноль";

        const units = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
        const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
        const tens = ["", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
        const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];

        let words = "";
        let remainder = Math.round(num);
        let thousands = Math.floor(remainder / 1000);
        remainder %= 1000;

        if (thousands > 0) {
            words += numToWordsRu(thousands) + " тысяч ";
        }

        if (remainder >= 100) {
            words += hundreds[Math.floor(remainder / 100)] + " ";
            remainder %= 100;
        }

        if (remainder >= 10 && remainder < 20) {
            words += teens[remainder - 10] + " ";
        } else {
            words += tens[Math.floor(remainder / 10)] + " ";
            words += units[remainder % 10] + " ";
        }

        return words.trim().charAt(0).toUpperCase() + words.slice(1);
    };
    const grandTotalWords = grandTotal ? numToWordsRu(grandTotal) : "Ошибка в расчёте";
    return(
        <>
            <table className="invoice-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Товары (работы, услуги)</th>
                    <th colSpan="2">Количество</th>
                    <th>Вес</th>
                    <th>Объем</th>
                    <th>Цена</th>
                    <th>Ставка НДС</th>
                    <th>Сумма НДС</th>
                    <th>Сумма</th>
                    <th>Удалить позицию</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.selectedGost || "—"}</td>
                        <td>{item.quantity ?? 0}</td>
                        <td>{item.totalWeight ?? "—"}</td>
                        <td>{item.shellWeight ?? "—"}</td>
                        <td>{item.shellWeightPPU ?? "—"}</td>
                        <td>{parseFloat(item.steelPipePrice || 0).toLocaleString()} руб.</td>
                        <td>{item.selectedThickness || "—"}</td>
                        <td>{parseFloat(item.shellPrice || 0).toLocaleString()} руб.</td>
                        <td>{parseFloat(item.workPayment || 0).toLocaleString()} руб.</td>
                        <td width="50">
                            <img onClick={() => handleDelete(index)} src="/images/icons/delete.svg" alt="delete"/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="summary-info">
                <p>Итого: {total.toLocaleString()} руб.</p>
                <p>В т.ч. НДС (20%): {vat.toLocaleString()} руб.</p>
                <p><strong>Итого с НДС: {grandTotal.toLocaleString()} руб.</strong></p>
            </div>
            <div className="summary">
                <p>{formattedResult}</p>
                <p><strong>{grandTotalWords} рублей</strong></p>
            </div>
        </>
    )
}