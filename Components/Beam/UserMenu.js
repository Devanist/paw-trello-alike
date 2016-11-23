import React, {Component} from 'react';
import {Link} from 'react-router';
import Language from '../../Languages/Language';

class UserMenu extends Component{

    render(){

        return (
            <section id="userMenu">
                <ul>
                    <li><Link to={`/user/${this.props.username}`}>
                        {Language[this.props.lang].UserMenu.link}
                    </Link></li>
                    <li>{Language[this.props.lang].UserMenu.settings}</li>
                    <li>
                        <a id="Logout" onClick={this.props.trigger}>
                            {Language[this.props.lang].UserMenu.logout}
                        </a>
                    </li>
                </ul>
            </section>
        )

    }

}

export default UserMenu;