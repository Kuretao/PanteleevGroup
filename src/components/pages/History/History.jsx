import "./History.css";
import {ButtonDefault} from "../../ui/button/Button";
import {NavLink} from "react-router-dom";


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
]

export const History = () => {
    return(
        <section className="container history">
            {HistoryItems.map((item) => (
                <div className="history-item" >
                    <div className="history__leftside">
                        <div className="history__leftside-head">
                            <h2>{item.number}</h2>
                            <span>Создан {item.date} - {item.person}</span>
                        </div>

                        <NavLink to="/Table"><ButtonDefault propsClass={"edit"} buttonDefaultText={"Редактировать"}/></NavLink>
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
    )
}