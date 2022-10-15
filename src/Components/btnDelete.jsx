import React from "react";

const Botão = (props) =>{

return(
    <>
        <button className={props.class} onClick={props.acao}>{props.children}</button>
    </>
)
} 

export default Botão