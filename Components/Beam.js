import React, {Component} from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

class Beam extends Component{

    extendMenu(){

    }

    render(){

        let asideContent;
        if(this.props.user !== null){
            asideContent =  <aside>
                                {this.props.user.name}
                                <img id="beam_profile_pic" src={this.props.user.profile_pic} onClick={this.extendMenu} />
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
                        <li>Profile</li>
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