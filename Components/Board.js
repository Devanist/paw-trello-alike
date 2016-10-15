import React, {Component} from 'react';
import List from './List';

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