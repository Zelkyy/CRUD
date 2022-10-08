/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import '../assets/css/cadastro.css';
import { api } from "../api/api";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    const [setGetEmail] = useState([])
    const navigate = useNavigate();

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

    const Register = () => {
        if (nomeUsuario !== '' && email !== '' && descricao !== '') {
            api.post(`email`, { nome: nomeUsuario, descricao: descricao, email: email })
            navigate('/registros')
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
                                maxLength="40"
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
                    <button className="button_register" onClick={() => { Register() }} >Cadastrar</button>
                </div>
            </main>
        </>
    )
}

export default Cadastro