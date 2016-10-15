import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import $ from 'jquery';
import {Actions} from '../Actions/Actions';

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
                }, 200);
            });
    }

    render(){

        let asideContent;
        let sidePanelTrigger;
        let userPic;
        let userMenu = "";

        if(this.props.user !== null){

            if(this.props.user.profile_pic === ""){
                userPic = "https://cdn4.iconfinder.com/data/icons/mayssam/512/user-128.png";
            }
            else{
                userPic = this.props.user.profile_pic;
            }

            asideContent =  <aside>
                                <p>{this.props.user.fullname}</p>
                                <span onClick={this.extendMenu}>
                                    <img id="beam_profile_pic" src={userPic} />
                                </span>
                            </aside>;

            sidePanelTrigger = <div id="sidePanelTrigger" onClick={this.extendSidebar}><p>Boards</p></div>;

            userMenu = <section id="userMenu">
                    <ul>
                        <li><Link to={`/user/${this.props.user.name}`}>Profile</Link></li>
                        <li>Boards</li>
                        <li>Settings</li>
                        <li><a id="Logout" onClick={() => {
                            this.props.dispatch(Actions.logout())
                            this.props.router.push('/');
                        }}>
                            Log out</a>
                        </li>
                    </ul>
                </section>;

        }
        else{
            asideContent =  <aside>
                                <p id="loggedOutParagraph">Please <Link to="/register">register</Link> or <Link to="/login">log in</Link>.</p>
                            </aside>
            sidePanelTrigger = "";
        }

        return(
            <section id="beam">
                {sidePanelTrigger}
                <Link id="beamHomeLink" to="/">Home</Link>
                {asideContent}
                {userMenu}
            </section>
        )
    }

}

Beam = withRouter(Beam, {withRef: true});

export default Beam;