import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import $ from 'jquery';
import appConfig from '../../config';
import {Actions, setMessage} from '../../Actions/Actions';

import BeamAside from './BeamAside';
import AddNewMenu from './AddNewMenu';
import AddNewMenuInput from './AddNewMenuInput';
import UserMenu from './UserMenu';

class Beam extends Component{

    constructor(){
        super();
        this.addNew = this.addNew.bind(this);
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
        find("h3, ul").
        removeClass("hidden");

        $("#addMenu").
        find("input, span").
        addClass("hidden");

        $("#addMenu").
        toggleClass("hidden").
        find('a:first').
        focus();
    }

    addNew(){

        if(this.addWhat === "addBoardLink"){
            $.post(`${appConfig.host}/boards`, {title: $("#add_title").val()}).
            done( (data) => {
                if(data.error){
                    setMessage.call(this, "fail", data.error);
                }
                this.props.dispatch(Actions.addBoard(data));
                this.props.router.push(`/board/${data.id}`);
            }).
            fail((error) => {
                setMessage.call(this, "fail", "SERVER ERROR");
            });
        }

    }

    render(){

        let beamContent = "";

        if(this.props.user !== null){

            let userPic = "https://cdn4.iconfinder.com/data/icons/mayssam/512/user-128.png";

            if(this.props.user.profile_pic !== ""){
                userPic = this.props.user.profile_pic;
            }

            beamContent = (
                <section id="beam">
                    <div id="sidePanelTrigger"><p>Boards</p></div>
                    <div id="addMenuTrigger" onClick={this.extendAddMenu}><span></span></div>
                    <AddNewMenu />
                    <AddNewMenuInput trigger={this.addNew} />
                    <Link id="beamHomeLink" to="/">Home</Link>
                    <BeamAside username={this.props.user.fullname} userPic={userPic} trigger={this.extendMenu} />
                    <UserMenu username={this.props.user.name} dispatch={this.props.dispatch} 
                        trigger={() => {
                            this.props.dispatch(Actions.logout())
                            this.props.router.push('/');
                        }} 
                    />
                </section>
            )
        }
        else{
            beamContent = (
                <section id="beam">
                    <aside>
                        <p id="loggedOutParagraph">Please <Link to="/register">register</Link> or <Link to="/login">log in</Link>.</p>
                    </aside>
                </section>
            );
        }

        return beamContent;
    }

    componentDidMount(){

        var that = this;
        $("#sidePanelTrigger").on("click", () => {
            $("#BoardsSidePanel").toggle();
        });

        $(".addNewLink").on("click", function(){
            that.addWhat = $(this).attr("id");
            $("#add_title").val("");
            $("#addMenuInputBox").toggleClass("hidden");
            $("#add_title").focus();
        });

        $("#addBoardLink").on("focusout", function hideAddMenu(e){
            setTimeout( () => {
                $("#addMenu").toggleClass("hidden");
            }, 150);
        });

        $(".return").on("click", function (){
            $("#addMenu").toggleClass("hidden");
            $("#addMenuInputBox").toggleClass("hidden");
            $("#addBoardLink").focus();
        });

        $("#cancel_add_element").on("click", function(){
            $("#addMenuInputBox").toggleClass("hidden");
        });
    }

}

Beam = withRouter(Beam, {withRef: true});

export default Beam;