import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {Actions, setMessage} from '../../Actions/Actions';
import bcrypt from 'bcryptjs';
import appConfig from '../../config';
import $ from 'jquery';
import Utils from '../../Utils';

import Style from '../../Styles/Register.scss';

class Register extends Component{
    render(){
        return (
            <section id="registerForm">
                <h1>Welcome!</h1>
                <h2>We would be very happy to have you in our ranks!</h2>
                <section>
                    <label>Login:</label><input id="register_login" type="text" placeholder="f.e. FancyNewUser" /><br/>
                    <label>Full name:</label><input id="register_fullname" type="text" placeholder="f.e. Jimmy Boards" /><br/>
                    <label>Email address:</label><input id="register_email" type="email" placeholder="f.e. jim.boards@email.com" /><br/>
                    <label>Password:</label><input id="register_password" type="password" /><br/>
                    <label>Repeat password:</label><input id="register_repeatPassword" type="password" /><br/>
                    <input id="signupButton" className="confirmationButton" type="submit" value="Sign up" />
                </section>

                <p>Already have an account? <Link to="/login">Here</Link> you can sign in :)</p>
            </section>
        );
    }

    componentDidMount(){
        $("#signupButton").on("click", registerUser.bind(this));
    }

}

function registerUser(){
    let form = {
        login : $("#register_login").val(),
        fullname : $("#register_fullname").val(),
        email : $("#register_email").val(),
        password : $("#register_password").val(),
        hash : ""
    };

    if(form.password !== $("#register_repeatPassword").val()){
        setMessage.call(this, "fail", "Given passwords do not match.");
        return;
    }

    if(!Utils.validateEmail(form.email)){
        setMessage.call(this, "fail", "Given email address is not valid.");
        return;
    }

    form.password = bcrypt.hashSync(form.password, 10);
    form.hash = bcrypt.getSalt(form.password);

    $.post(`${appConfig.host}/register`, form).
    done( (data) => {
        if(data.error){
            setMessage.call(this, "fail", data.error);
            return;
        }

        setMessage.call(this, "success", "Your account was created. You can login now.");
        setTimeout( () => {
            this.props.router.push('/login');
        }, 3000);

    }).
    fail( (error) => {
        setMessage.call(this, "fail", "SERVER ERROR");
    });
}

function mapStateToProps(state){
    return state;
}

Register = withRouter(Register, {withRef: true});

export default connect(mapStateToProps)(Register);