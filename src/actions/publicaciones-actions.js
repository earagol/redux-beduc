import axios from 'axios'
import { 
    ACTUALIZAR, 
    CARGANDO, 
    ERROR, 
    COM_ACTUALIZAR,
    COM_ERROR, 
    COM_CARGANDO 
} from './../types/publicaciones-types'
import * as usuariosTypes from './../types/usuarios-types'

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes

export const traerPorUsuario = (key) => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO,//'cargando'
        payload: true
    })

    const { usuarios } = getState().usuariosReducer
    const { publicaciones } = getState().publicacionesReducer
    const usuario_id = usuarios[key].id

    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)
        
        const nuevas = respuesta.data.map((publicacion) => (
            {
                ...publicacion,
                comentarios:[],
                abierto:false
            }
        ))
        
        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ]

        dispatch({
            type: ACTUALIZAR,//'traer_usuarios'
            payload: publicaciones_actualizadas
        })

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
    }catch(error){
        dispatch({
            type: ERROR,
            payload: 'Publicaciones no dispononibles.'
        })
    }
}

export const abrirCerrar = (publicaciones_key,com_key) => (dispatch,getState) => {
    const { publicaciones } = getState().publicacionesReducer
    const seleccionada = publicaciones[publicaciones_key][com_key]
   
    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    }
    
    const publicaciones_actualizadas = [...publicaciones]
    publicaciones_actualizadas[publicaciones_key] = [
        ...publicaciones[publicaciones_key]
    ]
    publicaciones_actualizadas[publicaciones_key][com_key] = actualizada

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    })
}

export const traerComentarios = (publicaciones_key,com_key) => async (dispatch, getState) => {
    dispatch({
        type: COM_CARGANDO,//'cargando'
        payload: true
    })
    const { publicaciones } = getState().publicacionesReducer
    const seleccionada = publicaciones[publicaciones_key][com_key]

    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)
        const actualizada = {
            ...seleccionada,
            comentarios: respuesta.data
        }

        const publicaciones_actualizadas = [...publicaciones]
        publicaciones_actualizadas[publicaciones_key] = [
            ...publicaciones[publicaciones_key]
        ]
        publicaciones_actualizadas[publicaciones_key][com_key] = actualizada

        dispatch({
            type: COM_ACTUALIZAR,
            payload: publicaciones_actualizadas
        })
    }catch(error) {
        console.log(error.message)
        dispatch({
            type: COM_ERROR,
            payload: 'Comentarios no dispononibles.'
        })
    }
}