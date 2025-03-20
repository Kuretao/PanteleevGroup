import "./History.css";
import {ButtonDefault} from "../../ui/button/Button";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";

export const History = () => {
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [historyItems, setHistoryItems] = useState([]);


    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                if (!user.username) return;

                const response = await fetch(`http://176.108.250.117:8000/orders/${user.username}`);
                const data = await response.json();
                console.log("Заказы:", data);

                setHistoryItems(data);
            } catch (error) {
                console.error("Ошибка загрузки истории:", error);
            }
        };

        fetchHistory();
    }, []);

    const toggleSelection = (index: number) => {
        setSelectedIndexes((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };

    const getSummary = () => {
        const summary: Record<string, number> = {};
        selectedIndexes.forEach((index) => {
            const number = historyItems[index]?.order?.orderDetails?.number;
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

                    <ButtonDefault buttonDefaultText={"Заказать фуру"} propsClass={"smallBtn"} />
                </div>
            )}

            {historyItems.map((item, index) => (
                <div key={item.id} className="history-item">
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
                            <h2>{item.order?.orderDetails?.number || "Не указан номер"}</h2>
                            <span>Создан {new Date(item.order?.orderDetails?.date).toLocaleDateString()} - {item.contact_person}</span>
                        </div>
                        <NavLink to="/Table">
                            <ButtonDefault propsClass={"edit"} buttonDefaultText={"Редактировать"} />
                        </NavLink>
                    </div>
                    <div className="history__rightside">
                        <div className="history__note">
                            <h1>Заметки</h1>
                            <h2>Ответственный: {item.contact_person}</h2>
                        </div>
                        <div className="history__rightside-left">
                            <h2>Контактное лицо</h2>
                            <h2>Юр. лицо</h2>
                        </div>
                        <div className="history__rightside-right">
                            <h2>{item.email} {item.phone_number}</h2>
                            <h2>{item.order?.companyDetails?.name}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};