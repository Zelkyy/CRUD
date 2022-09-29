import React from "react";
import '../assets/css/registros.css';
import { Link } from "react-router-dom";


export const Btn = (props) => {
    if (props.trocarbtn === true) {
        return (<button className="button__editar" onClick={props.editar}>Editar</button>)
    }
    else {
        return (<button className="button_register" onClick={props.cadastrar}><Link className="link-register" to='/registros'>Cadastrar</Link></button>)
    }
}

export default Btn;
