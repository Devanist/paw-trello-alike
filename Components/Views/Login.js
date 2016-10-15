import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

class Login extends Component{
    render(){

        return (<section>
            <input type="text"/>
            <input type="password" />
            <input type="submit" value="Sign in" />
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