import "./History.css";
import {ButtonDefault} from "../../ui/button/Button";
import {NavLink} from "react-router-dom";
import {useState} from "react";


const HistoryItems = [
    {
        number: "487562487562",
        date: "14.02.23",
        person:"Антон",
        contactName: "Менеджер Михаил",
        contactNumber:"+7 (777) 777 77 77",
        contactCompany:"ООО \"Рога и копыта\"",
        note: "Ответсвенный менеджер - Антон",
    },
    {
        number: "2222222222222222",
        date: "2",
        person:"3",
        contactName: "4",
        contactNumber:"5",
        contactCompany:"6"
    },
    {
        number: "11111111",
        date: "2",
        person:"3",
        contactName: "4",
        contactNumber:"5",
        contactCompany:"6"
    },
    {
        number: "11111111",
        date: "2",
        person:"3",
        contactName: "4",
        contactNumber:"5",
        contactCompany:"6"
    },
    {
        number: "11111111",
        date: "2",
        person:"3",
        contactName: "4",
        contactNumber:"5",
        contactCompany:"6"
    },
    {
        number: "11111111",
        date: "2",
        person:"3",
        contactName: "4",
        contactNumber:"5",
        contactCompany:"6"
    },
    {
        number: "4875624875622",
        date: "14.02.23",
        person:"Антон",
        contactName: "Менеджер Михаил",
        contactNumber:"+7 (777) 777 77 77",
        contactCompany:"ООО \"Рога и копыта\"",
        note: "Ответсвенный менеджер - Антон",
    },
    {
        number: "22222222222222222",
        date: "2",
        person:"3",
        contactName: "4",
        contactNumber:"5",
        contactCompany:"6"
    },
    {
        number: "111111111",
        date: "2",
        person:"3",
        contactName: "4",
        contactNumber:"5",
        contactCompany:"6"
    },
    {
        number: "114111111",
        date: "2",
        person:"3",
        contactName: "4",
        contactNumber:"5",
        contactCompany:"6"
    },
    {
        number: "111511111",
        date: "2",
        person:"3",
        contactName: "4",
        contactNumber:"5",
        contactCompany:"6"
    },
    {
        number: "111161111",
        date: "2",
        person:"3",
        contactName: "4",
        contactNumber:"5",
        contactCompany:"6"
    },
]

export const History = () => {
    const [selectedIndexes, setSelectedIndexes] = useState([]);

    const toggleSelection = (index) => {
        setSelectedIndexes((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };

    const getSummary = () => {
        const summary = {};
        selectedIndexes.forEach((index) => {
            const number = HistoryItems[index].number;
            summary[number] = (summary[number] || 0) + 1;
        });
        return summary;
    };

    const summaryData = getSummary();

    return (
        <section className="container history">
            {selectedIndexes.length > 0 && (
                <div className="history-summary">
                    <h2>Выбрано {selectedIndexes.length} элементов</h2>

                    <div className="history__options">
                        {Object.entries(summaryData).map(([number, count]) => (
                            <p key={number}>Номер {number}: {count} шт.</p>
                        ))}
                    </div>

                    <ButtonDefault buttonDefaultText={"Заказать фуру"} propsClass={"smallBtn"}/>
                </div>
            )}

            {HistoryItems.map((item, index) => (
                <div key={index} className="history-item">
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={selectedIndexes.includes(index)}
                            onChange={() => toggleSelection(index)}
                        />
                        <span></span>
                    </label>
                    <div className="history__leftside">
                        <div className="history__leftside-head">
                            <h2>{item.number}</h2>
                            <span>Создан {item.date} - {item.person}</span>
                        </div>
                        <NavLink to="/Table">
                            <ButtonDefault propsClass={"edit"} buttonDefaultText={"Редактировать"} />
                        </NavLink>
                    </div>
                    <div className="history__rightside">
                        <div className="history__note">
                            <h1>Заметки</h1>
                            <h2>{item.note}</h2>
                        </div>
                        <div className="history__rightside-left">
                            <h2>Контактное лицо</h2>
                            <h2>Юр. лицо</h2>
                        </div>
                        <div className="history__rightside-right">
                            <h2>{item.contactName} {item.contactNumber}</h2>
                            <h2>{item.contactCompany}</h2>
                        </div>
                    </div>
                </div>
            ))}


        </section>
    );
};