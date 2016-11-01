import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import Style from '../../Styles/Login.scss';
import {Actions} from '../../Actions/Actions';
import bcrypt from 'bcryptjs';
import $ from 'jquery';
import appConfig from '../../config';

class Login extends Component{

    constructor(){
        super();
        this.login = this.login.bind(this);
    }

    login(){
        
        let credentials = {
            login : $("#login").val(),
            password : $("#password").val(),
        };

        let hash;
        $.get(`${appConfig.host}/hash/${credentials.login}`).
        done((data) => {
            hash = data;
            credentials.password = bcrypt.hashSync(credentials.password, hash);
            $.post(`${appConfig.host}/login`, credentials).
                done((data) => {
                    if(data.error){
                        //TO DO: SWITCH ON MESSAGE
                        this.props.dispatch(Actions.setMessage("fail", "ERROR_LOGIN"));
                        setTimeout( () => {
                            this.props.dispatch(Actions.setMessage("hide"));
                        }, 5000);
                    }
                    else{
                        this.props.dispatch(Actions.login(user));
                    }
                });
        }).
        fail((err) => {
            this.props.dispatch(Actions.setMessage("fail", "SERVER_ERROR"));
            setTimeout( () => {
                this.props.dispatch(Actions.setMessage("hide"));
            }, 5000);
        });

    }

    render(){

        return (<section id="LoginForm">
            <h1>Hello again!</h1>
            <h2>We are happy to see you :)</h2> 
            <input id="login" type="text" placeholder="Login"/>
            <input id="password" type="password" placeholder="Password" />
            <input className="confirmationButton" id="submit" type="submit" value="Sign in" onClick={this.login} />
            <p>
                Don't remember your password? Don't worry and click <Link to="/forgotPassword">HERE</Link>.
            </p>
            <p>
                You are not our client? <Link to="/register">HERE</Link> you can join us.
            </p>
        </section>);
    }

    componentWillMount(){
        if(this.props.user !== null){
            this.props.dispatch(Actions.setMessage("fail", "You are already logged in."));
            this.props.router.push('/');
        }
    }
}

Login = withRouter(Login, {withRef: true});

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Login);