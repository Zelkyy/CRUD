import React, { useEffect, useState } from "react";
import '../assets/css/registros.css'
import { api } from "../api/api";
import LoadingSpinner from "../assets/img/loading.svg"
import EditModal from "../assets/modal/EditModal";
import { useNavigate } from "react-router-dom";

export const Page = () => {
    const [getEmail, setGetEmail] = useState([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState('hide')
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


    const ShowModal = (estadoAtual, id, item) => {
        if (estadoAtual === 'hide') {
            setModal('show')
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }
        else {
            setModal('hide')
        }

        setGetId(id)
    }

    async function Delete(id) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            setLoading(true)
            await api.delete(`email/${id}`)
    
                .then(() => { window.location.reload() })
            setLoading(false)
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
                <EditModal mostrar={modal} funcao={ShowModal} id={getId} />
                {getEmail.map((item) => {
                    return (
                        <div className="pacotes_edicao" key={item.id}>
                            <div className="alinhamento_div_pacote">
                                <div className="div_position_pacotes">
                                    <p className="p-nome-status">{item.nome}</p>
                                    <p className="descricao_status">{item.descricao}</p>
                                    <p className="email-status">Email: {item.email}</p>
                                    <div className="buttons">
                                        <button className="button_editar" id="buttonEditar" onClick={() => ShowModal(modal, item.id)}>Editar</button>
                                        <button className="button_excluir" id="buttonExcluir" onClick={() => Delete(item.id)}>Excluir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {loading ? <div className={"fundo_escurecido"} ></div> : false}
                {loading ? <img src={LoadingSpinner} alt="Loading" style={{ width: 250, position: 'absolute', left: "50%", top: "50%", marginLeft: "-110px", marginTop: "-100px", zIndex: 10 }}></img> : false}
                <div className={"fundo_escurecido " + modal} ></div>
            </main>
        </>
    )
}

export default Page