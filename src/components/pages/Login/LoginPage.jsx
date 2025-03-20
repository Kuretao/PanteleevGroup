import {InputDefault,  InputOnPassword} from "../../ui/input/Input";
import {ButtonDefault, ButtonWhite} from "../../ui/button/Button";
import "./Login.css"
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const AuthHead = () =>{
    return(
        <div className="welcome-head">
            <div className="title__head"><img src="/images/image/Logotype.png" alt=""/> <h2>Пантелеев групп</h2></div>
            <span>программа обсчета заказов труб в ППУ изоляции по ГОСТ 30732-2006</span>
        </div>
        )
}

export const LoginBody = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            navigate("/Main");
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://176.108.250.117:8000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.ok === "ok") {
                console.log("Успешный вход!");
                localStorage.setItem("user", JSON.stringify({ username }));
                navigate("/Main");
            } else {
                setError("Ошибка входа, проверьте логин и пароль");
            }
        } catch (err) {
            setError("Ошибка соединения с сервером");
        }
    };

    return (
        <main className="main__Log">
            <NavLink to={"/Registration"}>
                <ButtonWhite propsClass="admin-btn" buttonWhiteText="Админ панель" />
            </NavLink>
            <AuthHead />

            <form onSubmit={handleLogin}>
                <InputDefault label="Login" placeholder="Введите логин" onChange={(e) => setUsername(e.target.value)} />
                <InputDefault label="Password" placeholder="Введите пароль" type="password" onChange={(e) => setPassword(e.target.value)} />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <ButtonDefault type="submit" buttonDefaultText="Войти" />
            </form>
        </main>
    );
};

export const RegistrationBody = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://176.108.250.117:8000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Пользователь ${data[0].username} создан! ID: ${data[0].User}`);
            } else {
                setError(data[0]?.message || "Ошибка регистрации");
            }
        } catch (err) {
            setError("Ошибка соединения с сервером");
        }
    };

    return (
        <main className="main__Log">
            <AuthHead />
            <h2 className="Registration__title">Регистрация</h2>

            <form onSubmit={handleRegister}>
                <InputDefault label="Имя" placeholder="Введите имя" onChange={(e) => setFirstName(e.target.value)} />
                <InputDefault label="Фамилия" placeholder="Введите фамилию" onChange={(e) => setLastName(e.target.value)} />
                <InputDefault label="Логин" placeholder="Введите логин" onChange={(e) => setUsername(e.target.value)} />
                <InputOnPassword label="Пароль" labelRep="Повторите пароль" onChange={(e) => setPassword(e.target.value)}  password={password} setPassword={setPassword} />

                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <ButtonDefault buttonDefaultText="Зарегистрироваться" />
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
