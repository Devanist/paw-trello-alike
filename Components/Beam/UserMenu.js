import React, {Component} from 'react';
import {Link} from 'react-router';

class UserMenu extends Component{

    render(){

        return (
            <section id="userMenu">
                <ul>
                    <li><Link to={`/user/${this.props.username}`}>Profile</Link></li>
                    <li>Settings</li>
                    <li>
                        <a id="Logout" onClick={this.props.trigger}>
                            Log out
                        </a>
                    </li>
                </ul>
            </section>
        )

    }

}

export default UserMenu;