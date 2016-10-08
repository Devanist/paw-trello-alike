import React, {Component} from 'react';

class Board extends Component {

    render(){
        return (
            <section id={`board_${id}`} className="board">
                <h2>{this.props.board.title}</h2>
                {this.props.board.lists.map( (list) => {
                    <List list={list} id={`list_${list.id}`}/>
                } )}
            </section>
        )
    }
}