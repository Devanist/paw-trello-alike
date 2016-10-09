import React from 'react';
import {createStore} from 'redux';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './Components/App';
import Reducer from './Reducer';

import style from './Styles/Layout.scss';
import liststyle from './Styles/List.scss';
import listitemstyle from './Styles/ListItem.scss';

var store = createStore(Reducer);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);