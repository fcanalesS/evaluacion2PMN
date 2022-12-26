import React, {Component} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Moment from 'moment'

export class HomeComponent extends Component {
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
                res.data.sort(function (a, b) {
                    return new Date(b.fechaIngreso) - new Date(a.fechaIngreso)
                })
                this.setState({pacientes: res.data})
            }).catch(error => {
            console.log(error)
        })
    }

    Eliminar = (id) => {
        axios.delete("http://localhost:3001/borrarPaciente/" + id)
            .then((response) => { alert("Paciente eliminado con éxito."); window.location.reload(); })
            .catch((error) => { alert("Ha ocurrido un error"); console.log("ERROR", error) })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Bienvenido...</h2>
                    </div>
                    <div className="col-md-12">
                        Listado de Pacientes Recientes
                        <table className="table table-bordered table-hover table-responsive">
                            <thead>
                            <tr>
                                <th>Rut Paciente</th>
                                <th>Nombre Paciente</th>
                                <th>Edad Paciente</th>
                                <th>Sexo</th>
                                <th>Fecha Ingreso</th>
                                <th>Enfermedad</th>
                                <th>Revisado</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.pacientes.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.rut}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.edad}</td>
                                        <td>{item.sexo}</td>
                                        <td>{Moment(item.fechaIngreso).format('DD/MM/YYYY')}</td>
                                        <td>{item.enfermedad}</td>
                                        <td>{item.revisado === false ? '𐄂' : '✓'}</td>
                                        <td>
                                            <div className="d-grid gap-2 d-md-block">
                                                <Link to={"/paciente/actualizar/" + item._id} className="btn btn-warning btn-sm"
                                                      type="button">Modificar</Link> &nbsp;
                                                <button onClick={() => this.Eliminar(item._id)} className="btn btn-danger btn-sm"
                                                        type="button">Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }


}