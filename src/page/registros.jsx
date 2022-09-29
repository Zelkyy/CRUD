import React, { useEffect, useState } from "react";
import '../assets/css/registros.css'
import { api } from "../api/api";
import { Btn } from "../Components/btn";
import Swal from 'sweetalert2'

export const Page = () => {
    const [getEmail, setGetEmail] = useState([])

    const ListarEmail = () => {
        api.get('email')
            .then(result => {
                setGetEmail(result.data)
            })
    }

    useEffect(() => {
        ListarEmail()
    }, [])

    const [nomeUsuario, setNomeUsuario] = useState('')
    const [descricao, setDescricao] = useState('')
    const [email, setEmail] = useState('')
    const [boolean, setBoolean] = useState(false)
    const [guardarId, setId] = useState(0)

    const Register = () => {
        if (nomeUsuario !== '' && email !== '' && descricao !== '') {
            api.post(`email`, { nome: nomeUsuario, descricao: descricao, email: email })
                .then(() => { window.location.reload() })
        }
        else {
            Swal.fire({
                title: 'Preencha os campos vazios!',
                icon: 'warning',
                confirmButtonColor: '#41B8D2',
                confirmButtonText: 'OK'
            })
        }
    }

    const Edit = () => {
        api.put(`email/${guardarId}`, { nome: nomeUsuario, descricao: descricao, email: email })
            .then(() => { window.location.reload() })
    }

    const Delete = (id) => {
        api.delete(`email/${id}`)
            .then(() => { window.location.reload() })
    }

    const guardarInfos = (id, nome, descricao, email) => {
        setNomeUsuario(nome)
        setDescricao(descricao)
        setEmail(email)
        setId(id)
        setBoolean(true)
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <>
            <header>
                <h1 className="titulo_header">SyncTur</h1>
            </header>
            <main>
                <section className="alinhamento_divs">
                    <div>
                        <p className="p-nome">Nome Completo</p>
                        <div>
                            <input id="inputPacote" className="input_pacote" type="text"
                                maxLength="20"
                                placeholder="Digite nome completo"
                                value={nomeUsuario}
                                onChange={(estado) => setNomeUsuario(estado.target.value)} />
                        </div>
                        <div className="div_status">
                            <div>
                                <h2 className="p-email">Email</h2>
                                <input type="email" name="Email" id="Email"
                                    className="email"
                                    placeholder="Coloque seu email"
                                    value={email}
                                    onChange={(estado) => setEmail(estado.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="div_descricao">
                        <h2 className="p-nome">Descrição</h2>
                        <textarea name="textarea" maxLength="128"
                            id="descricao"
                            placeholder="Escreva sua mensagem aqui"
                            value={descricao}
                            onChange={(estado) => setDescricao(estado.target.value)}></textarea>
                    </div>
                </section>
                <div id="divButtonRegister">
                    <Btn trocarbtn={boolean} editar={Edit} cadastrar={Register} />
                </div>

                {getEmail.map((item) => {
                    return (
                        <div className="pacotes_edicao" key={item.id}>
                            <div className="alinhamento_div_pacote">
                                <div className="div_position_pacotes">
                                    <p className="p-nome-status">{item.nome}</p>
                                    <p className="descricao_status">{item.descricao}</p>
                                    <p className="email-status">Email: {item.email}</p>
                                    <div className="buttons">
                                        <button className="button_editar" id="buttonEditar" onClick={() => guardarInfos(item.id, item.nome, item.descricao, item.email)}>Editar</button>
                                        <button className="button_excluir" id="buttonExcluir" onClick={() => Delete(item.id)}>Excluir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </main>
        </>
    )
}

export default Page