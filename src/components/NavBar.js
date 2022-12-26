import React, {Component} from "react";
import {Link} from "react-router-dom";

export class NavbarComponente extends Component{
    render(){

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Evaluación 2</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/paciente/nuevo">Agregar Paciente</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/paciente/listar">Listar Pacientes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/paciente/buscar">Buscar Paciente</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}