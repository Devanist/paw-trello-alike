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
import User from './Components/Views/User';

import style from './Styles/Layout.scss';
import boardstyle from './Styles/Board.scss';
import beamstyle from './Styles/Beam.scss';
import userstyle from './Styles/User.scss';

var store = createStore(Reducer);

render(
    (   
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="register" component={Register}/>
                    <Route path="login" component={Login}/>
                    <Route path="user/:name" component={User} />
                </Route>
            </Router>
        </Provider>
    ),
    document.getElementById('app')
);