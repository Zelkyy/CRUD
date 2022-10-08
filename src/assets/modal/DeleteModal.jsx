import React from "react";
import { useState } from "react";
import LoadingSpinner from "../img/blackLoading.svg";
import { api } from "../../api/api";
import "../modal/DeleteModal.css";

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
                        <button className="btnVoltarModal" onClick={props.funcaoDelete}>Não</button>

                        <div className="AlinhamentoDeleteModal">
                            <button className="btnDeleteModal" onClick={() => Delete(props.id)}>Sim</button>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? <img src={LoadingSpinner} alt="Loading" style={{ width: 250, position: 'absolute', left: "50%", top: "50%", marginLeft: "-110px", marginTop: "-100px", zIndex: 10 }}></img> : false}
        </>

    );
};

export default DeleteModal;