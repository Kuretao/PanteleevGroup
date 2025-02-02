import "./Button.css";


export  const ButtonDefault = ({buttonDefaultText, propsClass}) =>{
    const additionalClass = `buttonDefault ${propsClass}`;
    return(
        <button className={additionalClass}>{buttonDefaultText}</button>
    )
}

export  const ButtonWhite = ({buttonWhiteText, propsClass}) => {
    const additionalClass = `buttonWhite ${propsClass}`;
    return(<button className={additionalClass}>{buttonWhiteText}</button>)}