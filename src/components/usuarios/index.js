import React, { Component } from 'react';

import axios from 'axios'
//importar el connect para conectar el componente al reducer
import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuarios-actions'

class Usuarios extends Component {
  constructor(){
    super();
    // this.state = {
    //   usuarios:[]
    // }
  }

  componentDidMount() {
    this.props.traerTodos()
  }

  ponerFilas = () => (
    this.props.usuarios.map((usuario) => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ))
  )

  render() {
    return (
      <div>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>
            { this.ponerFilas() }
          </tbody>
        </table>
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
