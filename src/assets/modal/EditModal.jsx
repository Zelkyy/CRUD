import React, { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../img/blackLoading.svg";
import { api } from "../../api/api";
import "../modal/modal.css";

const EditModal = (props) => {

  const [nomeUsuario, setNomeUsuario] = useState('')
  const [descricao, setDescricao] = useState('')
  const [email, setEmail] = useState('')
  const [loadingModal, setLoadingModal] = useState(false)
  const [warning, setWarning] = useState(false);

  async function Editar(id) {
    if (nomeUsuario !== '' && email !== '' && descricao !== '') {
      setLoadingModal(true)
      await api.put(`email/${id}`, { nome: nomeUsuario, descricao: descricao, email: email })
        .then(() => { window.location.reload() })
      setLoadingModal(false)
    }
    else {
      setWarning(true)
    }
  }

  useEffect(() =>{
    if(props.item !== undefined){

      setNomeUsuario(props.item.nome)
      setEmail(props.item.email)
      setDescricao(props.item.descricao)
    }
  }, [props.item])

  return (
    <>
      <div className={"EditModal " + props.mostrar}>
        <div className="alinhamentoExcluirModal">
          <button className="excluirModal" onClick={props.funcao}>X</button>
        </div>

        <div className="cardTxt">
          <h1>Modificar Registros</h1>

          <div className="AlinhamentoInputModal">
            <input
              type="text"
              placeholder="Nome completo"
              className="inputModal"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descrição"
              className="inputModal"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="inputModal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {warning && (
              <p><span className="vermelho">*</span>Coloque um campo válido nesse input!</p>
            )}

            <div className="AlinhamentoModalSalvar">
              <button className="btnSalvarModal" onClick={() => Editar(props.id)}>Salvar</button>
            </div>
          </div>
        </div>
        <footer className="footerModal"></footer>
      </div>
      {loadingModal ? <img src={LoadingSpinner} alt="Loading" style={{ width: 250, position: 'absolute', left: "50%", top: "50%", marginLeft: "-110px", marginTop: "-100px", zIndex: 10 }}></img> : false}
    </>

  );
};

export default EditModal;
