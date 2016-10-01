import React from 'react';
import {createStore} from 'redux';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './Components/App';
import Reducer from './Reducer';

var store = createStore(Reducer);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);