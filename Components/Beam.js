import React, {Component} from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

class Beam extends Component{

    extendSidebar(){
        $("#BoardsSidePanel").toggle();
    }

    extendMenu(){
        $("#userMenu").toggle().
            find('a:first').
            focus().
            on("click", function hideUserMenuOnClick(){
                $("#userMenu").hide();
            }).
            on("focusout", function hideUserMenu(e){
                setTimeout( ( ) => {
                    $("#userMenu").hide();
                }, 100);
            });
    }

    render(){

        let asideContent;
        let userPic;

        if(this.props.user.profile_pic === ""){
            userPic = "https://cdn4.iconfinder.com/data/icons/mayssam/512/user-128.png";
        }
        else{
            userPic = this.props.user.profile_pic;
        }
        if(this.props.user !== null){
            asideContent =  <aside>
                                <p>{this.props.user.fullname}</p>
                                <span onClick={this.extendMenu}>
                                    <img id="beam_profile_pic" src={userPic} />
                                </span>
                            </aside>;
        }
        else{
            asideContent =  <aside>
                                Please <Link to="/register">register</Link> or <Link to="/login">log in</Link>.
                            </aside>
        }

        return(
            <section id="beam">
                <div id="sidePanelTrigger" onClick={this.extendSidebar}><p>Boards</p></div>
                <Link id="beamHomeLink" to="/">Home</Link>
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