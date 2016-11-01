import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import $ from 'jquery';
import appConfig from '../config';
import {Actions} from '../Actions/Actions';

class Beam extends Component{

    constructor(){
        super();
        this.addNewBoard = this.addNewBoard.bind(this);
    }

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

    extendAddMenu(){
        $("#addMenu").
        toggle().
        find('a:first').
        focus().
        on("click", function hideAddMenuOnClick(){
            $("#addMenu").hide();
        }).
        on("focusout", function hideAddMenu(e){
            setTimeout( ( ) => {
                $("#addMenu").hide();
            }, 100);
        });
    }

    addNewBoard(){
        $.get(`${appConfig.host}/newBoard`).
        done((data) => {
            if(data.error){

            }
            else{
                this.props.router.push(`/board/${data}`);
            }
        }).
        fail( (err) => {
            this.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
        });
    }

    render(){

        let asideContent;
        let sidePanelTrigger = "";
        let addMenuTrigger = "";
        let addMenu = "";
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

            addMenuTrigger = <div id="addMenuTrigger" onClick={this.extendAddMenu}><span></span></div>;

            addMenu = <div id="addMenu">
                    <h3>Add a...</h3>
                    <ul>
                        <li>
                            <a href="#" onClick={this.addNewBoard}>
                                <section>
                                <h4>new board</h4>
                                <img src="../../Assets/boards.png"/>
                                </section>
                            </a>
                        </li>
                    </ul>
                </div>;

            userMenu = <section id="userMenu">
                    <ul>
                        <li><Link to={`/user/${this.props.user.name}`}>Profile</Link></li>
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
        }

        return(
            <section id="beam">

                {sidePanelTrigger}
                {addMenuTrigger}
                {addMenu}
                <Link id="beamHomeLink" to="/">Home</Link>
                {asideContent}
                {userMenu}
            </section>
        )
    }

}

Beam = withRouter(Beam, {withRef: true});

export default Beam;