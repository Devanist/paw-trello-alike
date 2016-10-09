import React, {Component} from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

class Beam extends Component{

    extendMenu(){

    }

    render(){

        let asideContent;
        let userPic;

        if(this.props.user.profile_pic === ""){
            userPic = "https://cdn4.iconfinder.com/data/icons/mayssam/512/user-128.png";
        }
        if(this.props.user !== null){
            asideContent =  <aside>
                                {this.props.user.name}
                                <img id="beam_profile_pic" src={userPic} onClick={this.extendMenu} />
                            </aside>;
        }
        else{
            asideContent =  <aside>
                                Please <Link to="/register">register</Link> or <Link to="/login">log in</Link>.
                            </aside>
        }

        return(
            <section className="beam">
                <Link to="/">Home</Link>
                {asideContent}
                <section id="userMenu">
                    <ul>
                        <li><Link to={`/user/${this.props.user.name}`}>Profile</Link></li>
                        <li>Boards</li>
                        <li>Settings</li>
                        <li>Log out</li>
                    </ul>
                </section>
            </section>
        )
    }

}

export default Beam;