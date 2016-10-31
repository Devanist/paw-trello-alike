import React, {Component} from 'react';
import List from './List';
import $ from 'jquery';
import appConfig from '../config';
import {Actions} from '../Actions/Actions';

class Board extends Component {

    constructor(){
        super();
        this.editTitle = this.editTitle.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.addNewList = this.addNewList.bind(this);
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


    toggleListNameInput() {
        $("#addListMenu").toggleClass("hidden");
    }

    addNewList(){
        $.post(`${appConfig.host}/cardlist`, {title: $("#add_list_title").val(), boardId: this.props.board.id}).
        done((data) => {
            console.log(data);
            if(data.error){
                this.props.dispatch(Actions.setMessage("fail", data.error));
            }
            this.props.dispatch(Actions.addList(data));
            //Dokonczyc \/
            //this.props.router.push(`//`);
        }).
        fail( (err) => {
            this.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
        });
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
                <div>
                    <section id="addListTrigger" onClick={this.toggleListNameInput}>
                    </section>
                    <section id="addListMenu" className="hidden">
                        <input type="text" id="add_list_title" placeholder="Add a title..."/>
                        <input type="submit" id="add_element" value="Add" onClick={this.addNewList}/>
                        <input type="submit" id="cancel_add_element" value="Cancel"/>
                    </section>
                </div>
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

        $("#add_element").on("click", function(){
            $("#addListMenu").toggleClass("hidden");
        });

        $("#cancel_add_element").on("click", function(){
            $("#addListMenu").toggleClass("hidden");
        });

    }
}

export default Board;