import "./Modal.css"
import {ButtonDefault, ButtonWhite} from "../ui/button/Button";
import {useState} from "react";
import {InputDefault} from "../ui/input/Input";

const ModalInfo = [
    {
        company: "company",
        number: "2131231232",
        person: "Миша",
        tel: "+79939775035"
    }
]

export const Modal = ({setIsModalOpen}) =>{
    return(
        <div className="modal-container">
            <div className="modal">
                <div className="modal-head">
                        <h1>Заказ создан</h1>
                        <img className="close" src="/images/icons/close.svg" alt="" onClick={() => setIsModalOpen(false)}/>
                </div>
                <span className="info">тут какие-то заметки или информация</span>
                <div className="modal-body">
                    {ModalInfo.map((item) => (
                        <div className="modal-item">
                            <div className="modal-company">
                                <h2>#БогданЖиви</h2>
                                <div className="modal-company-main">
                                    <span>Номер счета</span>
                                    <p>{item.number}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="modal-contact">
                                <h2>Контактное лицо</h2>
                                <div className="modal-contact-main">
                                    <span>{item.person}</span>
                                    <p>{item.tel}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <i onClick={() => setIsModalOpen(false)}><ButtonDefault buttonDefaultText={"Ок"}/></i>
            </div>
        </div>
    );
};

export const PostModal = ({setIsEmailModalOpen}) =>
{

    const [email, setEmail] = useState("");
    const handleSend = () => {
        console.log("Отправлено на email:", email);
        setIsEmailModalOpen(false);
    };
    return(
        <div className="modal-container">
            <div className="modal">
                <div className="modal-head">
                    <h1>Введите email</h1>
                    <img className="close" src="/images/icons/close.svg" alt="" onClick={() => setIsEmailModalOpen(false)}/>
                </div>
                <span className="info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo quos repellendus rerum?</span>
                <div className="modal-body">
                    <InputDefault placeholder={"Введите email"}/>
                </div>
                <ButtonDefault buttonDefaultText="Отправить" onClick={handleSend} />
            </div>
        </div>
    )
}