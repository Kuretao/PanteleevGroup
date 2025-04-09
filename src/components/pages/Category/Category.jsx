import Card from "../../ui/card/Card";
import "./Category.css";

const CategoryList = [
    {id: 1, title: "Труба в ППУ изоляции", image: "/images/pages/Category/default.png"},
    {id: 2, title: "Отвод в ППУ изоляции", image: "/images/pages/Category/otvod.jpg"},
    {id: 3, title: "Неподвижная опора в ППУ изоляции", image: "/images/pages/Category/default.png"},
    {id: 4, title: "Переход в ППУ изоляции", image: "/images/pages/Category/default.png"},
    {id: 5, title: "Тройник в ППУ изоляции", image: "/images/pages/Category/default.png"},
    {id: 6, title: "Тройниковое ответвление в ППУ изоляции", image: "/images/pages/Category/default.png"},
    {id: 7, title: "Параллельный тройник в ППУ изоляции", image: "/images/pages/Category/default.png"},
    {id: 8, title: "Тройник с шаровым краном воздушника в ППУ изоляции", image: "/images/pages/Category/default.png"},
    {id: 9, title: "Z-образный элемент", image: "/images/pages/Category/default.png"},
    {id: 10, title: "Элемент трубопровода с кабелем вывода в ППУ изоляции", image: "/images/pages/Category/default.png"},
    {id: 11, title: "Концевой элемент трубопровода с кабелем вывода в ППУ изоляции", image: "/images/pages/Category/default.png"},
    {id: 12, title: "Металическая заглушка изоляции", image: "/images/pages/Category/default.png"},
    {id: 13, title: "Скользящая опора", image: "/images/pages/Category/default.png"},
    {id: 14, title: "Скользящая опора", image: "/images/pages/Category/customopora.png"},
]

export const CategoryBody = () =>{
    return(
        <div className="Category">
            {CategoryList.map((item) => (<Card key={item} title={item.title} image={item.image}/>))}
        </div>
    )
}

export const Category = () => {
    return(
        <section className="container" style={{marginTop: 24}}>
            <CategoryBody/>
            <img src="/images/image/FullLogo.png" alt="" className="FullLogo"/>
        </section>
    )
}