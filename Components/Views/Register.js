import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {Actions} from '../../Actions/Actions';
import bcrypt from 'bcryptjs';
import appConfig from '../../config';

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
}

function mapStateToProps(state){
    return state;
}

Register = withRouter(Register, {withRef: true});

export default connect(mapStateToProps)(Register);