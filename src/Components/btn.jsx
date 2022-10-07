import React from "react";
import '../assets/css/registros.css';

export const Btn = (props) => {
    if (props.trocarbtn === true) {
        return (<button className="button__editar" onClick={props.editar}>Editar</button>)
    }
}

export default Btn;