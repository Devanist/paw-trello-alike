import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import $ from 'jquery';
import appConfig from '../../config';
import {Actions, setMessage} from '../../Actions/Actions';
import Language from '../../Languages/Language';

import BeamAside from './BeamAside';
import AddNewMenu from './AddNewMenu';
import AddNewMenuInput from './AddNewMenuInput';
import UserMenu from './UserMenu';
import LanguageSelector from './LanguageSelector';

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
        else if(this.addWhat === "createTeamLink") {
            //logika
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
                    <div id="sidePanelTrigger"><p>{Language[this.props.lang].Beam.sidePanelTrigger}</p></div>
                    <div id="addMenuTrigger" onClick={this.extendAddMenu}><span></span></div>
                    <AddNewMenu lang={this.props.lang} />
                    <AddNewMenuInput trigger={this.addNew} lang={this.props.lang} />
                    <Link id="beamHomeLink" to="/">{Language[this.props.lang].Beam.beamHomeLink}</Link>
                    <BeamAside username={this.props.user.fullname} userPic={userPic} trigger={this.extendMenu} />
                    <UserMenu lang={this.props.lang} username={this.props.user.name} dispatch={this.props.dispatch} 
                        trigger={() => {
                            this.props.dispatch(Actions.logout())
                            this.props.router.push('/');
                        }} 
                    />
                    <LanguageSelector dispatch={this.props.dispatch} lang={this.props.lang} />
                </section>
            )
        }
        else{
            beamContent = (
                <section id="beam">
                    <aside>
                        <p id="loggedOutParagraph">
                            {Language[this.props.lang].Beam.loggedOutParagraph[0]} 
                            <Link to="/register">
                                {Language[this.props.lang].Beam.loggedOutParagraph[1]}
                            </Link>
                                {Language[this.props.lang].Beam.loggedOutParagraph[2]} 
                            <Link to="/login">
                                {Language[this.props.lang].Beam.loggedOutParagraph[3]}
                            </Link>
                        </p>
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

        //do poprawy
        $(".createNewTeamLink").on("click", function(){
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