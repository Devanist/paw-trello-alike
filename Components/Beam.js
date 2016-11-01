import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import $ from 'jquery';
import appConfig from '../config';
import {Actions} from '../Actions/Actions';

class Beam extends Component{

    constructor(){
        super();
        this.addNew = this.addNew.bind(this);
        this.showInput = this.showInput.bind(this);
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

    showInput(e){
        $("#addMenuInputBox").toggleClass("hidden");
        $("#add_title").focus();
    }

    addNew(){

        if(this.addWhat === "addBoardLink"){
            $.post(`${appConfig.host}/boards`, {title: $("#add_title").val()}).
            done( (data) => {
                console.log(data);
                if(data.error){
                    this.props.dispatch(Actions.setMessage("fail", data.error));
                }
                this.props.dispatch(Actions.addBoard(data));
                this.props.router.push(`/board/${data.id}`);
            }).
            fail((error) => {
                this.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
            });
        }

    }

    render(){

        let asideContent;
        let sidePanelTrigger = "";
        let addMenuTrigger = "";
        let addMenu = "";
        let addMenuInputBox = "";
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

            addMenu =   <div id="addMenu" className="hidden">
                            <h3>Add a...</h3>
                            <ul>
                                <li>
                                    <a id="addBoardLink" className="addNewLink" href="#">
                                        <section>
                                        <h4>new board</h4>
                                        <img src="../../Assets/boards.png"/>
                                        </section>
                                    </a>
                                </li>
                            </ul>
                        </div>;

            addMenuInputBox =   <div id="addMenuInputBox" className="hidden">
                                    <span className="return"></span>
                                    <input type="text" id="add_title" placeholder="Add a title..."/>
                                    <input type="submit" id="add_element" value="Add" onClick={this.addNew} />
                                    <input type="submit" id="cancel_add_element" value="Cancel" />
                                </div>

            userMenu =  <section id="userMenu">
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
                {addMenuInputBox}
                <Link id="beamHomeLink" to="/">Home</Link>
                {asideContent}
                {userMenu}
            </section>
        )
    }

    componentDidMount(){

        var that = this;

        $(".addNewLink").on("click", function(){
            that.addWhat = $(this).attr("id");
            $("#add_title").val("");
            that.showInput();
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