import React, {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import List from './List';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/sortable';
import appConfig from '../config';
import {Actions, setMessage} from '../Actions/Actions';

class Board extends Component {

    constructor(){
        super();
        this.editTitle = this.editTitle.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.addNewList = this.addNewList.bind(this);
        this.oldTitle = "";
    }

    renderLists(){
        return this.props.currentBoard.lists.map( (list) => {
            return <List key={list.id} list={list} dispatch={this.props.dispatch} />
        });
    }

    editTitle(){
        $("#saveBoardTitle, #cancelBoardTitle, #editBoardTitle").toggleClass("hidden");

        let title = $("#boardTitle");
        this.oldTitle = title.text().substr();
        title.attr('contenteditable', 'true');
    }

    getBoard(){

        if(this.props && this.props.board){
            this.props.currentBoard = this.props.board;
        }
        else{
            $.get(`${appConfig.host}/boards/${this.props.params.id}.json`).
            done( (data) => {
                if(data.error){
                    setMessage.call(this, "fail", data.error);
                    this.props.push('/');
                }
                else{
                    this.props.dispatch(Actions.setCurrentBoard(data));
                }
            }).
            fail( () => {
                setMessage.call(this, "fail", "SERVER ERROR");
                this.props.dispatch(Actions.setCurrentBoard({
                    title: "Example Board",
                    id: 0,
                    isFav: "fav",
                    lists: [
                        {
                            id: 0,
                            title: "TO DO",
                            listItems: [
                                {
                                    id: 0,
                                    title: "Wash dishes"
                                },
                                {
                                    id: 1,
                                    title: "Do something"
                                }
                            ]
                        },
                        {
                            id: 1,
                            title: "IN WORK",
                            listItems: [
                                {
                                    id: 0,
                                    title: "Walk a dog"
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: "DONE",
                            listItems: [
                                {
                                    id: 0,
                                    title: "Get some sleep"
                                },
                                {
                                    id: 1,
                                    title: "Do nothing"
                                },
                                {
                                    id: 2,
                                    title: "Wake up"
                                }
                            ]
                        }
                    ]
                }));
                //this.props.push('/');
            });
        }
    }

    componentWillMount(){
        this.getBoard();
    }

    toggleListNameInput() {
        $("#addListMenu").toggleClass("hidden");
    }

    addNewList(){
        $.post(`${appConfig.host}/cardlist`, {title: $("#add_list_title").val(), boardId: this.props.currentBoard.id}).
        done((data) => {
            if(data.error){
                setMessage.call(this, "fail", data.error);
            }
            this.props.dispatch(Actions.addList(data));
            //Dokonczyc \/
            //this.props.router.push(`//`);
        }).
        fail( (err) => {
            setMessage.call(this, "fail", "SERVER ERROR");
        });
    }

    componentWillUnmount(){
        this.props.dispatch(Actions.setCurrentBoard(this.props.emptyBoard));
    }
    
    render(){

        return (
                <section id={`board`} className="board">
                    <h2 id="boardTitle" contentEditable="false">{this.props.currentBoard.title}</h2>
                    <span id="editBoardTitle" onClick={this.editTitle}></span>
                    <span id="saveBoardTitle" className="hidden"></span>
                    <span id="cancelBoardTitle" className="hidden"></span>
                    <span id="removeBoard"></span>
                    <span id="favBoard" className={this.props.currentBoard.isFav}></span>
                    <section id="listsContainer">{this.renderLists()}</section>
                    <section id="confirmRemove" className="hidden">
                        <p>Are you sure you want to remove this board?</p>
                        <div className="confirmation"><p>OK</p></div>
                        <div className="abort"><p>Cancel</p></div> 
                    </section>
                    <div>
                    <section id="addListTrigger" onClick={this.toggleListNameInput}>
                    </section>
                    <section id="addListMenu" className="hidden">
                        <input type="text" id="add_list_title" placeholder="Add a title..."/>
                        <input type="submit" id="addNewList" value="Add" onClick={this.addNewList}/>
                        <input type="submit" id="cancel_addNewList" value="Cancel"/>
                    </section>
                </div>
                </section>
            )
    }

    componentDidMount(){
        $("#saveBoardTitle").on("click", () => {
            $("#cancelBoardTitle, #saveBoardTitle, #editBoardTitle").toggleClass("hidden");
            $("#boardTitle").attr('contenteditable', 'false');
            $.post(`${appConfig.host}/saveBoardTitle`, {id: this.props.currentBoard.id, title: $("#boardTitle").text()}).
            done( (data) => {
                if(data.error){
                    setMessage.call(this, "fail", data.error);
                    $("#boardTitle").text(this.oldTitle);
                }
                else{
                    this.props.dispatch(Actions.saveBoardTitle( $("#boardTitle").text()));
                }
            }).
            fail( (error) => {
                setMessage.call(this, "fail", "SERVER ERROR");
                $("#boardTitle").text(this.oldTitle);
            });
        });

        $("#cancelBoardTitle").on("click", () => {
            $("#boardTitle").text(this.oldTitle);
            $("#boardTitle").attr('contenteditable', 'false');
            $("#cancelBoardTitle, #saveBoardTitle, #editBoardTitle").toggleClass("hidden");
        });

        $("#addNewList").on("click", function(){
            $("#addListMenu").toggleClass("hidden");
        });

        $("#cancel_addNewList").on("click", function(){
            $("#addListMenu").toggleClass("hidden");
        });

        $("#removeBoard").on("click", () => {
            let anwser = null;
            $("#confirmRemove").toggleClass("hidden");

            $(".confirmation").on('click', () => {
                handleUserInput.call(this, true);
            });

            $(".abort").on('click', () => {
                handleUserInput.call(this, false);
            });

        });

        $("#listsContainer").
        sortable({cancel: '.list h3'}).
        on("sortstop", listOrderChangeHandler.bind(this));

        $("#favBoard").on("click", () => {

            let fav = true;
            if(this.props.currentBoard.isFav === "fav"){
                fav = false;
            }
            $.post(`${appConfig.host}/boards/${this.props.currentBoard.id}`, {fav: fav }).
            done( (data) => {
                if(data.error){
                    setMessage.call(this, "fail", data.error);
                    return;
                }
                this.props.dispatch(Actions.setFav(fav));
            }).
            fail( (error) => {
                setMessage.call(this, "fail", "SERVER ERROR");
            });

        });

    }
}

function listOrderChangeHandler(){
    let lists = $("#listsContainer .list:not(.ui-sortable-placeholder)");
    let orders = [];
    
    for(let list in lists){
        if(lists.hasOwnProperty(list)){
            
            if(lists.get(list).id){
                orders.push(parseInt(lists.get(list).id.substr(5)));
            }

        }

    }

    $.post(`${appConfig.host}`, orders).
    done( (data) => {
        if(data.error){
            setMessage.call(this, "fail", data.error);
            //this.props.dispatch(Actions.sortLists());
            this.props.router.push(`/board/${this.props.board.id}`);
            return;
        }
        this.props.dispatch(Actions.sortLists(orders));
    }).
    fail( (error) => {
        setMessage.call(this, "fail", "SERVER ERROR");
        //this.props.dispatch(Actions.sortLists());
        this.props.router.push(`/board/${this.props.board.id}`);
    });

}

function handleUserInput(anwser){
    
    $("#confirmRemove").addClass("hidden");

    if(anwser){
        $.get(`${appConfig.host}/removeBoard/${this.props.currentBoard.id}`).
        done( (data) => {
            if(data.error){
                setMessage.call(this, "fail", data.error);
            }
            else{
                setMessage.call(this, "success", `Board ${this.props.currentBoard.title} was removed.`);
                this.props.dispatch(Actions.removeBoard(this.props.currentBoard.id));
                this.props.router.push('/');
            }
        }).
        fail( (error) => {
            setMessage.call(this, "fail", "SERVER ERROR");
            this.props.dispatch(Actions.removeBoard(this.props.currentBoard.id));
            this.props.router.push('/');
        });
    }
}

Board = withRouter(Board, {withRef: true});

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Board);