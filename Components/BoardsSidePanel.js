import React, {Component} from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import {Actions} from '../Actions/Actions';

class BoardsSidePanel extends Component{

    mapBoardsList(){
        return this.props.boards.map(boardToListElement);
    }

    render(){
        const userBoards = this.mapBoardsList();
        this.searchedBoards = this.props.searchResults.map(boardToListElement);

        let favedBoards = this.props.boards.filter( (board) => {
            return board.isFav === "fav";
        });
        
        this.favedBoards = [];
        if(favedBoards.length > 0){
            this.favedBoards = favedBoards.map(boardToListElement);
        }
        console.log(this.favedBoards);

        return (<aside id="BoardsSidePanel">
            <input id="searchBoards" type="text" placeholder="Search for a board..." />
            <span id="clearSearchBoards" title="Clear search box"></span>
            <h2>Starred boards</h2>
            <ul>
                {this.favedBoards}
            </ul>
            <ul>
                {this.searchedBoards}
            </ul>
            <h2>All boards</h2>
            <ul>
                {this.mapBoardsList()}
            </ul>
        </aside>)
    }

    componentDidMount(){
        $("#searchBoards").on("input", () => {
            this.props.dispatch( Actions.searchBoard( $("#searchBoards").val() ) );
        });
    }



}

function boardToListElement(board){
    return (
        <li key={board.id}>
            <Link to={`/board/${board.id}`}>
                {board.title}
            </Link>
        </li>
    )
}

export default BoardsSidePanel;