import { combineReducers } from 'redux'
//Importar reducers
import usuariosReducer from './usuarios-reducer'
import publicacionesReducer from './publicaciones-reducer'

export default combineReducers({
    usuariosReducer,
    publicacionesReducer
})