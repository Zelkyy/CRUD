import React, { useEffect, useState } from "react";
import '../assets/css/registros.css'
import { api } from "../api/api";
import LoadingSpinner from "../assets/img/loading.svg"
import EditModal from "../assets/modal/EditModal";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../assets/modal/DeleteModal";
import Botão from "../Components/btnDelete";

export const Page = () => {
    const [getEmail, setGetEmail] = useState([])
    const [loading] = useState(false)
    const [modalEdit, setModalEdit] = useState('hide')
    const [modalDelete, setModalDelete] = useState('hide')
    const [getId, setGetId] = useState(0)
    const [item, setItem] = useState()
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

    const ShowModalEdit = (estadoAtual, id, item) => {
        if(estadoAtual === 'hide'){
            setModalEdit('show')
        }
        else{
            setModalEdit('hide')
        }

        setItem(item)
        setGetId(id)
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    const ShowModalDelete = (estadoAtual, id, item) => {
        if(estadoAtual === 'hide'){
            setModalDelete('show')
        }
        else{
            setModalDelete('hide')
        }

        setGetId(id)
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
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
            <EditModal item={item} mostrar={modalEdit} funcao={ShowModalEdit} id={getId}/>
                {getEmail.map((item) => {
                    return (
                        <div className="pacotes_edicao" key={item.id}>
                            <div className="alinhamento_div_pacote">
                                <div className="div_position_pacotes">
                                    <p className="p-nome-status">{item.nome}</p>
                                    <p className="descricao_status">{item.descricao}</p>
                                    <p className="email-status">Email: {item.email}</p>
                                    <div className="buttons">
                                    <Botão class={"button_editar"} acao={() => ShowModalEdit(modalEdit, item.id, item)}>Editar</Botão>
                                    <Botão class={"button_excluir"} acao={() => ShowModalDelete(modalDelete, item.id)} >Excluir</Botão>
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