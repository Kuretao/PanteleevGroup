import {InputDefault,  InputOnPassword} from "../../ui/input/Input";
import {ButtonDefault, ButtonWhite} from "../../ui/button/Button";
import "./Login.css"
import {NavLink} from "react-router-dom";

const AuthHead = () =>{
    return(
        <div className="welcome-head">
            <div className="title__head"><img src="/images/image/Logotype.png" alt=""/> <h2>Пантелеев групп</h2></div>
            <span>программа обсчета заказов труб в ППУ изоляции по ГОСТ 30732-2006</span>
        </div>
        )
}

export const LoginBody = () => {


    return (
        <main className="main__Log">
            <ButtonWhite propsClass={'admin-btn'} buttonWhiteText={'Админ панель'}/>
            <AuthHead/>

            <form >
                <InputDefault label={"Login"} placeholder={"dsa"}/>
                <InputDefault label={"Password"} placeholder={"dsa"}/>

                <NavLink to={"/Main"} style={{width: "100%"}}><ButtonDefault buttonDefaultText={"Войти"}/></NavLink>
            </form>
        </main>
    );
};

export const RegistrationBody = () => {
    const handleRegister = async (e) => {
        console.log();
    };


    return (
        <main className="main__Log">
            <AuthHead/>
            <h2 className="Registration__title">Регистрация</h2>


            <form onSubmit={handleRegister}>
                <InputDefault label="Имя" placeholder="Введите имя"/>
                <InputDefault label="Фамилия" placeholder="Введите фамилию"/>
                <InputDefault label="Логин" placeholder="Введите логин"/>
                <InputOnPassword label="Пароль" labelRep="Повторите пароль"/>
                <ButtonDefault buttonDefaultText="Зарегестрироваться"/>
            </form>
        </main>
    );
};

export function Login() {
    return (
        <div className="center">
            <LoginBody />
        </div>
    );
}

export function Registration() {
    return (
        <div className="center">
            <RegistrationBody />
        </div>
    );
}
