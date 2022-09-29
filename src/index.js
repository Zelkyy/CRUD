import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Page from './page/registros'
import Cadastro from './page/cadastro'

const root = ReactDOM.createRoot(document.getElementById('root'));

const Rotas = () =>{

  return(
    <BrowserRouter>
      <Routes>
        <Route element = {<Cadastro/>} path = '/'/>
        <Route element = {<Page/>} path = '/registros'/>
      </Routes>
    </BrowserRouter>
  )
}

root.render(
  <React.StrictMode> 
    <Rotas/> 
  </React.StrictMode>
);
