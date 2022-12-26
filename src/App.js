import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes as Switch, Route} from "react-router-dom";
import React from "react";
import {HomeComponent} from "./components/Home";
import {AgregarPacienteComponente} from "./components/AgregarPaciente";
import {NavbarComponente} from "./components/NavBar";
import {ListarPacienteComponente} from "./components/ListarPaciente";
import {BuscarPacienteComponente} from "./components/BuscarPaciente";
import {ActualizarPacienteComponente} from "./components/EditarPaciente";
import {DetallePacienteComponente} from "./components/DetallePaciente";

function App() {
    return (
        <div className="">
            {/*      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
            <NavbarComponente />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" element={<HomeComponent />}/>
                    <Route exact path="/inicio" element={<HomeComponent />}/>
                    <Route exact path="/paciente/nuevo" element={<AgregarPacienteComponente />}/>
                    <Route exact path="/paciente/actualizar/:id" element={<ActualizarPacienteComponente />}/>
                    <Route exact path="/paciente/detalle/:id" element={<DetallePacienteComponente />}/>

                    <Route exact path="/paciente/listar" element={<ListarPacienteComponente />}/>
                    <Route exact path="/paciente/buscar" element={<BuscarPacienteComponente />}/>
                </Switch>
            </BrowserRouter>
        </div>

    );

}

export default App;
