import Card from "../../ui/card/Card";
import "./Category.css";

const CategoryList = [
    {id: 1, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 2, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 3, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 4, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 5, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 6, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 7, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 8, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 9, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 10, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 11, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 12, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 13, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
    {id: 14, title: "Труба в ППУ изоляции", image: "/images/pages/Category/Zaglushka.png"},
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