import React, { Component } from 'react';

// import axios from 'axios'
//importar el connect para conectar el componente al reducer
import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuarios-actions'

import Spinner from './../general/Spinner'
import Fatal from './../general/Fatal'

import { Link } from 'react-router-dom'

class Usuarios extends Component {
  // constructor(){
  //   super();
  //   // this.state = {
  //   //   usuarios:[]
  //   // }
  // }

  componentDidMount() {
    if(!this.props.usuarios.length){
      this.props.traerTodos()
    }
  }

  ponerContenido = () => {
    return(
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          { this.ponerFilas() }
        </tbody>
      </table>
    )
  }

  ponerFilas = () => (
    this.props.usuarios.map((usuario, key) => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
        <td>
          <Link to={`/publicaciones/${key}`}>
            <div className="eye-solid icon"></div>
          </Link>
        </td>
      </tr>
    ))
  )

  render() {
    if(this.props.cargando){
      return <Spinner />
    }

    if(this.props.error){
      return <Fatal mensaje={this.props.error} />
    }

    return (
      <div>
        <h1>
          Usuarios
        </h1>
        {this.ponerContenido()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.usuariosReducer
}

/*
usuariosActions  es un archivo de actions que se importa 
y es donde se hace el dispacth que alimenta el reducer
dentro se crea una funcion que esta disponible en el props
*/
export default connect(mapStateToProps, usuariosActions)(Usuarios)
