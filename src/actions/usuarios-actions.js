import axios from 'axios'
import { TRAER_TODOS, CARGANDO, ERROR } from './../types/usuarios-types'

export const traerTodos = () => async (dispatch) => {
    try {
        dispatch({
            type: CARGANDO,//'cargando'
            payload: true
        })

        const resUsuarios = await axios.get('https://jsonplaceholder.typicode.com/users')
        dispatch({
            type: TRAER_TODOS,//'traer_usuarios'
            payload: resUsuarios.data
        })

    }catch (error) {
        dispatch({
            type: ERROR,//'error'
            payload: 'Algo salió mal, intente más tarde' //error.message
        })
        // console.log('Error: ', error.message)
    }
}