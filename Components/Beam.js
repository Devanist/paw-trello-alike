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
                }, 100);
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
        $("#addMenu").
        find("h3, ul, span, input").
        toggleClass("hidden");
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
                <div id="addMenuTrigger" onClick={this.extendAddMenu}><span></span></div>
                <div id="addMenu" className="hidden">
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
                    <span className="return hidden"></span>
                    <input type="text" id="add_title" className="hidden" placeholder="Add a title..."/>
                    <input type="submit" id="add_element" className="hidden" value="Add" onClick={this.addNew} />
                </div>
                <Link id="beamHomeLink" to="/">Home</Link>
                {asideContent}
                <section id="userMenu">
                    <ul>
                        <li><Link to={`/user/${this.props.user.name}`}>Profile</Link></li>
                        <li>Settings</li>
                        <li>Log out</li>
                    </ul>
                </section>
            </section>
        )
    }

    componentDidMount(){

        var that = this;

        $(".addNewLink").on("click", function(){
            that.addWhat = $(this).attr("id");
            that.showInput();
        });

        $("#addBoardLink").on("focusout", function hideAddMenu(e){
            console.log(!$.contains($("#addMenu").get(0), e.originalEvent.explicitOriginalTarget));
            if(!$.contains($("#addMenu").get(0), e.originalEvent.explicitOriginalTarget)){
                setTimeout( () => {
                    $("#addMenu").toggleClass("hidden");
                }, 150);
            }
        });
    }

}

Beam = withRouter(Beam, {withRef: true});

export default Beam;