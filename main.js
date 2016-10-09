import React from 'react';
import {createStore} from 'redux';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './Components/App';
import Reducer from './Reducer';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';

import Home from './Components/Views/Home';
import Register from './Components/Views/Register';
import Login from './Components/Views/Login';

import style from './Styles/Layout.scss';

var store = createStore(Reducer);

render(
    (   
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="register" component={Register}/>
                    <Route path="login" component={Login}/>
                </Route>
            </Router>
        </Provider>
    ),
    document.getElementById('app')
);