import React, { useEffect, useState } from "react";
import '../assets/css/registros.css'
import { api } from "../api/api";
import LoadingSpinner from "../assets/img/loading.svg"
import EditModal from "../assets/modal/EditModal";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../assets/modal/DeleteModal";

export const Page = () => {
    const [getEmail, setGetEmail] = useState([])
    const [loading] = useState(false)
    const [modalEdit, setModalEdit] = useState('hide')
    const [modalDelete, setModalDelete] = useState('hide')
    const [getId, setGetId] = useState(0)
    const navigate = useNavigate()

    const ListarEmail = () => {
        api.get('email')
            .then(result => {
                setGetEmail(result.data)
            })
    }

    const botaoVoltar = () => {
        navigate('/')
    }

    useEffect(() => {
        ListarEmail()
    }, [])


    const ShowModalEdit = (estadoAtual, id) => {
        if(estadoAtual === 'hide'){
            setModalEdit('show')
        }
        else{
            setModalEdit('hide')
        }

        setGetId(id)
    }

    const ShowModalDelete = (estadoAtual, id) => {
        if(estadoAtual === 'hide'){
            setModalDelete('show')
        }
        else{
            setModalDelete('hide')
        }

        setGetId(id)
    }

    return (
        <>
            <header>
                <div>
                    <h1 className="titulo_header">SyncTur</h1>
                </div>
                <div>
                    <div className="seta" onClick={() => botaoVoltar()}></div>
                </div>
            </header>
            <main>
                <h2 className="h1-registros">Registros</h2>
            <DeleteModal mostrarDelete={modalDelete} funcaoDelete={ShowModalDelete} id={getId}/>
            <EditModal mostrar={modalEdit} funcao={ShowModalEdit} id={getId}/>
                {getEmail.map((item) => {
                    return (
                        <div className="pacotes_edicao" key={item.id}>
                            <div className="alinhamento_div_pacote">
                                <div className="div_position_pacotes">
                                    <p className="p-nome-status">{item.nome}</p>
                                    <p className="descricao_status">{item.descricao}</p>
                                    <p className="email-status">Email: {item.email}</p>
                                    <div className="buttons">
                                        <button className="button_editar" id="buttonEditar" onClick={() => ShowModalEdit(modalEdit, item.id)}>Editar</button>
                                        <button className="button_excluir" id="buttonExcluir" onClick={() => ShowModalDelete(modalDelete, item.id)}>Excluir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {loading ? <div className={"fundo_escurecido"} ></div> : false}
                {loading ? <img src={LoadingSpinner} alt="Loading" style={{ width: 250, position:'absolute', left: "50%", top: "50%", marginLeft: "-110px", marginTop: "-100px", zIndex: 10  }}></img> : false}
                <div className={"fundo_escurecido " + modalEdit} ></div>
                <div className={"fundo_escurecido " + modalDelete} ></div>
            </main>
        </>
    )
}

export default Page