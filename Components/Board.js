import React, {Component} from 'react';
import List from './List';

class Board extends Component {

    renderLists(){
        return this.props.board.lists.map( (list) => {
            return <List key={list.id} list={list} />
        });
    }

    render(){

        const lists = this.renderLists();

        return (
            <section id={`board_${this.props.board.id}`} className="board">
                <h2>{this.props.board.title}</h2>
                <section>{lists}</section>
            </section>
        )
    }
}

export default Board;