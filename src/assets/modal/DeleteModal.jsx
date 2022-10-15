import React from "react";
import { useState } from "react";
import LoadingSpinner from "../img/blackLoading.svg";
import { api } from "../../api/api";
import "../css/DeleteModal.css";
import Button from "../../Components/Botão";

const DeleteModal = (props) => {

    const [loading, setLoading] = useState(false)

    async function Delete(id) {
        setLoading(true)
        await api.delete(`email/${id}`)

            .then(() => { window.location.reload() })
        setLoading(false)
    }

    return (
        <>
            <div className={"DeleteModal " + props.mostrarDelete}>
                <div className="alinhamentoModalDelete">
                </div>

                <div className="cardTxtDelete">
                    <h1>Deseja Deletar o Registro?</h1>

                    <div className="alinhamentoBtnModal">
                        <Button class={"btnVoltarModal"} action={props.funcaoDelete}>Não</Button>

                        <div className="AlinhamentoDeleteModal">
                            <Button class={"btnDeleteModal"} action={() => Delete(props.id)}>Sim</Button>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? <img src={LoadingSpinner} alt="Loading" style={{ width: 250, position: 'absolute', left: "50%", top: "50%", marginLeft: "-110px", marginTop: "-100px", zIndex: 10 }}></img> : false}
        </>

    );
};

export default DeleteModal;