import axios from 'axios'
import { TRAER_POR_USUARIO, CARGANDO, ERROR } from './../types/publicaciones-types'
import * as usuariosTypes from './../types/usuarios-types'

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes

export const traerPorUsuario = (key) => async (dispatch, getState) => {
    const { usuarios } = getState().usuariosReducer
    const { publicaciones } = getState().publicacionesReducer
    const usuario_id = usuarios[key].id

    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)
    const publicaciones_actualizadas = [
        ...publicaciones,
        respuesta.data
    ]

    const publicaciones_key = publicaciones_actualizadas.length - 1
    const usuarios_actualizados = [...usuarios]
    usuarios_actualizados[key] = {
        ...usuarios[key],
        publicaciones_key
    }

    dispatch({
        type: USUARIOS_TRAER_TODOS,
        payload: usuarios_actualizados
    })
    
    dispatch({
        type: TRAER_POR_USUARIO,//'traer_usuarios'
        payload: publicaciones_actualizadas
    })

}