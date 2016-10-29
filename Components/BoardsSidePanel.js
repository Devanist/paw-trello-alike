import React, {Component} from 'react';
import {Link} from 'react-router';

class BoardsSidePanel extends Component{

    mapBoardsList(){
        return this.props.boards.map( (board) => {
            return (
            <li key={board.id}>
                <Link to={`/board/${board.id}`}>
                    {board.title}
                </Link>
            </li>
            )
        });
    }

    render(){

        

        return (<aside id="BoardsSidePanel">
            <h2>All boards</h2>
            <ul>
                {this.mapBoardsList()}
            </ul>
        </aside>)
    }

}

export default BoardsSidePanel;