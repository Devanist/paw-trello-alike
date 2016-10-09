import React, {Component} from 'react';
import {connect} from 'react-redux';

class User extends Component{

    render(){

        let _user;

        //If it's logged in user, use his data
        if(this.props.params.name === this.props.user.name){
            _user = this.props.user;
        }
        //If it's not logged user, fetch data from server
        else{
            _user = "Another user";
        }

        //If user don't have profile pic, use default one
        let profile_pic;
        if(_user.profile_pic === ""){
            profile_pic = "https://cdn4.iconfinder.com/data/icons/mayssam/512/user-128.png";
        }
        else{
            profile_pic = _user.profile_pic;
        }

        return (
            <section id="userView">
                <h2>{_user.fullname}</h2>
                <h4>@{_user.name}</h4>
                <img id="profile_pic" src={profile_pic} />
                <section>
                    <h3>Details</h3>
                    <ul>
                        <li>E-mail address: {_user.email}</li>
                        <li>About: <p>{_user.about}</p></li>
                    </ul>
                </section>
            </section>
        )
    }

}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(User);