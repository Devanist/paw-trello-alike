import React, {Component} from 'react';
import List from './List';
import $ from 'jquery';
import appConfig from '../config';
import {Actions} from '../Actions/Actions';

class Board extends Component {

    constructor(){
        super();
        this.editTitle = this.editTitle.bind(this);
        this.oldTitle = "";
    }

    renderLists(){
        return this.board.lists.map( (list) => {
            return <List key={list.id} dispatch={this.props.dispatch} list={list} />
        });
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

        const lists = this.renderLists();

        return (
            <section id={`board_${this.board.id}`} className="board">
                <h2 id="boardTitle" contentEditable="false">{this.board.title}</h2>
                <span id="editBoardTitle" onClick={this.editTitle}></span>
                <span id="saveBoardTitle" className="hidden"></span>
                <span id="cancelBoardTitle" className="hidden"></span>
                <section>{lists}</section>
                <section id="addListTrigger"  onClick={null}>
                </section>
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
    }
}

export default Board;