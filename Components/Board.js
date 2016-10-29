import React, {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import List from './List';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/sortable';
import appConfig from '../config';
import {Actions} from '../Actions/Actions';

class Board extends Component {

    constructor(){
        super();
        this.editTitle = this.editTitle.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.oldTitle = "";
    }

    renderLists(){
        return this.props.currentBoard.lists.map( (list) => {
            return <List key={list.id} list={list} />
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
                    this.props.dispatch(Actions.setMessage("fail", "ERROR"));
                    this.props.push('/');
                }
                else{
                    this.props.dispatch(Actions.setCurrentBoard(data));
                }
            }).
            fail( () => {
                this.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
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
                        <div className="confirmation">OK</div>
                        <div className="abort">Cancel</div> 
                    </section>
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
                    this.props.dispatch(Actions.setMessage("fail", "ERROR"));
                    $("#boardTitle").text(this.oldTitle);
                }
                else{
                    this.props.dispatch(Actions.saveBoardTitle( $("#boardTitle").text()));
                }
            }).
            fail( (error) => {
                this.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
                console.log('backup');
                $("#boardTitle").text(this.oldTitle);
            });
        });

        $("#cancelBoardTitle").on("click", () => {
            $("#boardTitle").text(this.oldTitle);
            $("#boardTitle").attr('contenteditable', 'false');
            $("#cancelBoardTitle, #saveBoardTitle, #editBoardTitle").toggleClass("hidden");
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
        sortable().
        on("sortstop", listOrderChangeHandler.bind(this));

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
            this.props.dispatch(Actions.setMessage("fail", data.error));
            //this.props.dispatch(Actions.sortLists());
            this.props.router.push(`/board/${this.props.board.id}`);
            return;
        }
        this.props.dispatch(Actions.sortLists(orders));
    }).
    fail( (error) => {
        this.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
        //this.props.dispatch(Actions.sortLists());
        this.props.router.push(`/board/${this.props.board.id}`);
    });

}

function handleUserInput(anwser){
    
    if(!anwser){
        $("#confirmRemove").toggleClass("hidden");
    }
    else{
        $.get(`${appConfig.host}/removeBoard/${this.props.currentBoard.id}`).
        done( (data) => {
            if(data.error){
                this.props.dispatch(Actions.setMessage("fail", "ERROR"));
                $("#confirmRemove").toggleClass("hidden");
            }
            else{
                this.props.dispatch(Actions.setMessage("success", `Board ${this.props.currentBoard.title} was removed.`));
                this.props.dispatch(Actions.removeBoard(this.props.currentBoard.id));
                this.props.router.push('/');
                $("#confirmRemove").toggleClass("hidden");
            }
        }).
        fail( (error) => {
            this.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
            $("#confirmRemove").toggleClass("hidden");
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