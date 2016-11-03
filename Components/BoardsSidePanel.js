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

        this.searchedBoards = "";

        if(this.props.searchResults.length > 0){
            this.searchedBoards = [
                <h2 key="searchResultsHeader">Search results</h2>,
                <ul key="searchResultsList">
                    {this.props.searchResults.map(boardToListElement)}
                </ul>
            ];
        }

        let favedBoards = this.props.boards.filter( (board) => {
            return board.isFav === "fav";
        });
        
        this.favedBoards = [];
        if(favedBoards.length > 0){
            this.favedBoards = favedBoards.map(boardToListElement);
        }

        return (
            <aside id="BoardsSidePanel">
                <input id="searchBoards" type="text" placeholder="Search for a board..." />
                <span id="clearSearchBoards" title="Clear search box"></span>
                <h2 id="starredBoards">Starred boards</h2>
                <ul id="starredBoardsList">
                    {this.favedBoards}
                </ul>
                {this.searchedBoards}
                <h2 id="allBoards">All boards</h2>
                <ul id="allBoardsList">
                    {this.mapBoardsList()}
                </ul>
            </aside>
        )
    }

    componentDidMount(){

        $("#searchBoards").on("input", () => {
            this.props.dispatch( Actions.searchBoard( $("#searchBoards").val() ) );
        });

        $("#BoardsSidePanel h2").on("click", function(e){
            const id = `#${$(this).attr("id")}List`;
            $(id).toggleClass("hidden");
        });

        $("#clearSearchBoards").on("click", () => {
            $("#searchBoards").val("");
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