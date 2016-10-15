import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import Style from '../../Styles/Login.scss';

class Login extends Component{
    render(){

        return (<section id="LoginForm">
            <h1>Hello again!</h1>
            <h2>We are happy to see you :)</h2> 
            <input id="login" type="text" placeholder="Login"/>
            <input id="password" type="password" placeholder="Password" />
            <input id="submit" type="submit" value="Sign in" />
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
            this.props.router.push('/');
        }
    }
}

Login = withRouter(Login, {withRef: true});

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Login);