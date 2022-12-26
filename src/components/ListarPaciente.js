import React, {Component} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Moment from 'moment'

export class ListarPacienteComponente extends Component {
    constructor() {
        super();
        this.state = {
            pacientes: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/pacientes",)
            .then(res => {
                console.log(res.data)
                this.setState({pacientes: res.data})
            }).catch(error => {
            console.log(error)
        })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                    this.state.pacientes.map(item => (
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-text">
                                        <img className="card-img-top img-fluid img-thumb" src={"http://localhost:3001/getFotoPersonal/" + item._id} alt="Imagen no disponible" /><br/>
                                        <ul style={{ "list-style": "none" }} className="text-center">
                                            <li>{item.nombre}</li>
                                            <li>{item.genero}</li>
                                        </ul>
                                        <hr/>
                                        {<div className="d-grid gap-2 d-md-block text-center">
                                            <Link to={"/paciente/detalle/" + item._id} className="btn btn-primary" type="button">Información Detallada</Link>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))
                    }
                </div>
            </div>



        );
    }
}