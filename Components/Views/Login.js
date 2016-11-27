import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import Style from '../../Styles/Login.scss';
import {Actions, setMessage} from '../../Actions/Actions';
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
        $.get(`${appConfig.host}/hash/0.json?login=${credentials.login}`).
        done((data) => {
            hash = data.hash;
            credentials.password = bcrypt.hashSync(credentials.password, hash);
            $.post(`${appConfig.host}/login/`, credentials).
                done((data) => {
                    if(data.error){
                        setMessage.call(this, "fail", "ERROR_LOGIN");
                    }
                    else{
                        this.props.dispatch(Actions.login(data));
                        setTimeout( () => {
                            this.props.router.push('/');
                        }, 400);
                    }
                });
        }).
        fail((err) => {
            setMessage.call(this, "fail", "SERVER ERROR");
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
            setMessage.call(this, "fail", "You are already logged in.");
            this.props.router.push('/');
        }
    }
}

Login = withRouter(Login, {withRef: true});

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Login);