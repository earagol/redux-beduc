import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
//import * as serviceWorker from './serviceWorker';

//Redux
import { 
    createStore, 
    applyMiddleware 
} from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'

//Importar un reducer o donde se combinan los reducers
import reducers from './reducers/'

const store = createStore(
    reducers,//Todos los reducer
    {}, // Estado Inicial
    applyMiddleware(reduxThunk) // Se pasa un middleware
)

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
