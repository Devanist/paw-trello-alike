import React, {Component} from 'react';
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
        this.oldTitle = "";
    }

    renderLists(list){
        return <List key={list.id} dispatch={this.props.dispatch} list={list} />
    }

    editTitle(){
        $("#saveBoardTitle, #cancelBoardTitle, #editBoardTitle").toggleClass("hidden");

        let title = $("#boardTitle");
        this.oldTitle = title.text().substr();
        title.attr('contenteditable', 'true');
    }

    getBoard(){
        let board;
        if(this.props && this.props.board){
            board = this.props.board;
        }
        else{
            $.get(`${appConfig.host}/board`).
            done( (data) => {
                if(data.error){
                    this.props.dispatch(Actions.setMessage("fail", "ERROR"));
                }
                else{
                    this.props.dispatch(Actions.setCurrentBoard(data));
                }
            })
        }

        return board;
    }

    render(){

        this.board = this.getBoard();

        return (
            <section id={`board_${this.board.id}`} className="board">
                <h2 id="boardTitle" contentEditable="false">{this.board.title}</h2>
                <span id="editBoardTitle" onClick={this.editTitle}></span>
                <span id="saveBoardTitle" className="hidden"></span>
                <span id="cancelBoardTitle" className="hidden"></span>
                <section id="listsContainer">{this.board.lists.map(this.renderLists.bind(this))}</section>
            </section>
        )
    }

    componentDidMount(){
        $("#saveBoardTitle").on("click", () => {
            $("#cancelBoardTitle, #saveBoardTitle, #editBoardTitle").toggleClass("hidden");
            $("#boardTitle").attr('contenteditable', 'false');
            $.post(`${appConfig.host}/saveBoardTitle`, {id: this.board.id, title: $("#boardTitle").text()}).
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
                $("#boardTitle").text(this.oldTitle);
            });
        });

        $("#cancelBoardTitle").on("click", () => {
            $("#boardTitle").text(this.oldTitle);
            $("#boardTitle").attr('contenteditable', 'false');
            $("#cancelBoardTitle, #saveBoardTitle, #editBoardTitle").toggleClass("hidden");
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

Board = withRouter(Board, {withRef: true});

export default Board;