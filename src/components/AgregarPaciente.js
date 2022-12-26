import React, {Component, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {Redirect} from 'react-router';
import SimpleReactValidator from 'simple-react-validator'
import axios from "axios";

export class AgregarPacienteComponente extends Component{
    rutRef = React.createRef();
    nombreRef = React.createRef();
    edadRef = React.createRef();
    sexoRef = React.createRef();
    enfermedadRef = React.createRef();
    revisadoRef = React.createRef();
    fechaIngresoRef = React.createRef();
    constructor() {
        super();

        this.state = {
            paciente: {},
            status: false
        }
    }

    componentWillMount() {
        this.validator = new SimpleReactValidator();
    }

    validar = (e) => {
        e.preventDefault();
        this.changeState();
        if (this.validator.allValid()){
            console.log(this.state.paciente);
            this.changeStatus();
            axios.post('http://localhost:3001/paciente', this.state.paciente)
                .then((response) => {console.log(response)})
                .catch((error) => {
                    console.log(error);
                })
        }else{
            this.validator.showMessages();
            this.forceUpdate();
            alert("Existen campos con errores o incompletos.")
        }
    }

    changeState = (e) => {
        this.setState({
            paciente: {
                rut: this.rutRef.current.value,
                nombre: this.rutRef.current.value,
                edad: this.edadRef.current.value,
                sexo: this.sexoRef.current.value,
                revisado: this.revisadoRef.current.checked,
                enfermedad: this.enfermedadRef.current.value,
                fechaIngreso: this.fechaIngresoRef.current.value
            }
        })

        console.log(this.state.paciente);
        this.validator.showMessages();
        this.forceUpdate();
    }

    changeStatus = () => {
        this.setState({status: true});
    }
    render(){
        function emailChange(value) {
            console.log(value);
        }


        return(

            <div className="container">
               <div className="row">
                   <form onSubmit={this.validar} >
                       {
                           <div className="col-md-12">
                               <h3>Agregar Paciente</h3>
                               <hr style={{"margin": "0px"}} />
                               <div className="form-group">
                                   <label htmlFor="">Rut Paciente</label>
                                   <input className="form-control" name="rut" ref={this.rutRef} onChange={this.changeState} />
                                   {
                                       this.validator.message('rut', this.state.paciente.nombre, 'required')
                                   }
                               </div>
                               <div className="form-group">
                                   <label htmlFor="">Nombre Paciente</label>
                                   <input className="form-control" name="nombre" ref={this.nombreRef} onChange={this.changeState} />
                                   {
                                       this.validator.message('nombre', this.state.paciente.nombre, 'required')
                                   }
                               </div>
                               <div className="form-group">
                                   <label htmlFor="">Edad</label>
                                   <input className="form-control" name="edad" ref={this.edadRef} onChange={this.changeState}/>
                                   {
                                       this.validator.message('edad', this.state.paciente.edad, 'required|numeric')
                                   }
                               </div>
                               <div className="form-group">
                                   <label htmlFor="">Sexo</label>
                                   <select name="" id="" className="form-control" name="sexo" ref={this.sexoRef} onChange={this.changeState}>
                                       <option value="masculino">Masculino</option>
                                       <option value="femenino">Femenino</option>
                                   </select>
                                   {
                                       this.validator.message('sexo', this.state.paciente.sexo, 'required')
                                   }
                               </div>
                               <div className="form-group">
                                   <label htmlFor="">Fecha de Ingreso</label>
                                   <input type="date" className="form-control" name="fechaIngreso" ref={this.fechaIngresoRef} onChange={this.changeState}/>
                                   {
                                       this.validator.message('fechaIngreso', this.state.paciente.fechaIngreso, 'required')
                                   }
                               </div>
                               <div className="form-group">
                                   <label htmlFor="">Enfermedad</label>
                                   <textarea name="enfermedad" id="" cols="30" rows="2" className="form-control" ref={this.enfermedadRef} onChange={this.changeState} ></textarea>
                                   {
                                       this.validator.message('enfermedad', this.state.paciente.sexo, 'required')
                                   }
                               </div>
                               <br/>
                               <div className="mb-3 form-check">
                                   <input type="checkbox" className="form-check-input" id="revisado" name="revisado" ref={this.revisadoRef} onChange={this.changeState} />
                                   <label className="form-check-label" htmlFor="exampleCheck1">Revisado</label>
                               </div>
                               <div className="form-group">
                                   <button type="submit" className="btn btn-success">Enviar</button>
                               </div>
                           </div>
                       }{
                           this.state.status === true && <Navigate to={{pathname:'/'}}></Navigate>
                   }
                   </form>
                   <hr style={{"margin-top": "1rem"}}/>
                   <div className="col-md-12">
                       <Link to="/" className="btn btn-primary">Volver</Link>
                   </div>
               </div>
            </div>
        );
    }

}