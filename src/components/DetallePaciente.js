import React, {Component} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Moment from 'moment'
import moment from "moment/moment";

export class DetallePacienteComponente extends Component {
    fileRef = React.createRef();

    constructor() {
        super();

        this.state = {
            paciente: {},
            status: false,
            id: '',
            selectedFile: null,
        }
    }

    componentWillMount() {
        const id = window.location.pathname.split("/")[3]
        this.setState({id: id});


        axios.get("http://localhost:3001/pacienteById/" + id,)
            .then(res => {
                console.log(res.data)
                this.setState({
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
                });
            }).catch(error => {
            console.log(error)
        })
    }


    handleSelectedFile = (event) => {

        this.setState({selectedFile: event.target.files[0]});
        console.log(event.target.files[0])

        const data = new FormData()
        data.append('fotoPersonal', event.target.files[0])

        let url = "http://localhost:3001/fileUpload/" + this.state.id;
        axios.post(url, data, { // receive two parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.warn(res);
                this.forceUpdate();
                window.location.reload();
            })

    }

    submit = (e) => {
        e.preventDefault();

        const data = new FormData()

        data.append('fotoPersonal', this.state.selectedFile)

        console.log(data);
        console.log(this.state.selectedFile);
        let url = "http://localhost:3001/fileUpload/" + this.state.id;

        console.log("URL IMAGEN", url)

        axios.post(url, data, { // receive two parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.warn(res);
            })
    }

    Eliminar = (id) => {
        axios.delete("http://localhost:3001/borrarPaciente/" + id)
            .then((response) => { alert("Paciente eliminado con éxito."); window.history.back(); })
            .catch((error) => { alert("Ha ocurrido un error"); console.log("ERROR", error) })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <h3>Agregar Paciente</h3>
                        <hr style={{"margin": "0px"}}/>
                        <div className="form-group">
                            <label htmlFor="">Rut Paciente</label>
                            <input className="form-control" name="rut" ref={this.rutRef}
                                   onChange={this.changeState} value={this.state.paciente.rut} readOnly="readonly"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Nombre Paciente</label>
                            <input className="form-control" name="nombre" ref={this.nombreRef}
                                   onChange={this.changeState} value={this.state.paciente.nombre} readOnly="readonly"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Edad</label>
                            <input className="form-control" name="edad" ref={this.edadRef}
                                   onChange={this.changeState} value={this.state.paciente.edad} readOnly="readonly"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Sexo</label>
                            <select name="" id="" className="form-control" name="sexo" ref={this.sexoRef}
                                    onChange={this.changeState} value={this.state.paciente.sexo} readOnly="readonly">
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Fecha de Ingreso</label>
                            <input type="date" className="form-control" name="fechaIngreso"
                                   ref={this.fechaIngresoRef} onChange={this.changeState}
                                   value={this.state.paciente.fechaIngreso} readOnly="readonly"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Enfermedad</label>
                            <textarea name="enfermedad" id="" cols="30" rows="2" className="form-control"
                                      ref={this.enfermedadRef} onChange={this.changeState}
                                      value={this.state.paciente.enfermedad} readOnly="readonly"></textarea>
                        </div>
                        <br/>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="revisado" name="revisado"
                                   ref={this.revisadoRef} onChange={this.changeState}
                                   checked={this.state.paciente.revisado}/>
                            <label className="form-check-label" htmlFor="exampleCheck1"
                                   readOnly="readonly">Revisado</label>
                        </div>
                        <div className="form-group">
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <Link to={"/paciente/actualizar/" + this.state.paciente.id} type="button" className="btn btn-primary">Modificar</Link>
                                &nbsp;
                                <button onClick={() => this.Eliminar(this.state.paciente.id)} type="button" className="btn btn-primary">Eliminar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 text-center">
                        <br/><br/>
                        <img className="img img-thumbnail"
                             src={"http://localhost:3001/getFotoPersonal/" + this.state.paciente.id}/>
                        <hr/>
                        <input type="file" className="form-control" name="fotoPersonal"  onChange={this.handleSelectedFile} ref={this.fileRef}/>

                    </div>
                </div>
            </div>
        )
    }
}