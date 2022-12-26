import React, {Component} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Moment from 'moment'
import moment from "moment";

export class BuscarPacienteComponente extends Component {
    sexoRef = React.createRef();
    fechaIngresoRef = React.createRef();
    enfermedadRef = React.createRef();

    constructor() {
        super();

        this.state = {
            paciente: [],
            status: false,
            id: '',
            selectedFile: null,
        }
    }

    buscarPaciente = () => {
        console.log(this.sexoRef.current.value)

        axios.get(`http://localhost:3001/busquedaPersonlizada/${this.sexoRef.current.value}/${this.fechaIngresoRef.current.value}/${this.enfermedadRef.current.value}`,)
            .then(res => {
                console.log(res.data)
                this.setState({paciente: res.data})
                /*this.setState({
                    paciente: {
                        rut: res.data.rut,
                        nombre: res.data.nombre,
                        edad: res.data.edad,
                        sexo: res.data.sexo,
                        fechaIngreso: moment(res.data.fechaIngreso).format("YYYY-MM-DD"),
                        enfermedad: res.data.enfermedad,
                        revisado: res.data.revisado,
                        id: res.data._id

                    }
                });*/
            }).catch(error => {
            console.log(error)
        })
    }


    render() {




        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="">Sexo</label>
                            <select name="sexp" id="" className="form-control" ref={this.sexoRef}>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="">Fecha de Ingreso</label>
                            <input name="fechaIngreso" type="date" className="form-control" ref={this.fechaIngresoRef}/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="">Enfermedad</label>
                            <textarea name="enfermedad" id="" cols="30" rows="1" className="form-control" ref={this.enfermedadRef}></textarea>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group text-center">
                            <label htmlFor="" style={{"display": "block"}}>&nbsp;</label>
                            <button className="btn btn-success" onClick={this.buscarPaciente}>Buscar</button>
                        </div>
                    </div>
                </div>
                <hr/>
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

                        this.state.paciente.map(item => (
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
        );
    }
}