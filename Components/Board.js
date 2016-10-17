import React, {Component} from 'react';
import List from './List';
import $ from 'jquery';
import appConfig from '../config';
import {Actions} from '../Actions/Actions';

class Board extends Component {

    renderLists(){
        return this.board.lists.map( (list) => {
            return <List key={list.id} list={list} />
        });
    }

    getBoard(){
        let board;
        if(this.props && this.props.board){
            board = this.props.board;
        }
        else{
            //TO DO
            //Fetch board from server using it's id
            $.get(`${appConfig.host}/board`).
            done( (data) => {
                if(data.error){

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
                <h2>{this.board.title}</h2>
                <section>{lists}</section>
            </section>
        )
    }
}

export default Board;