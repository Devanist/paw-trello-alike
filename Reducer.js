import {AT} from './Actions/Actions';

const initialState = {
    user: {
        id: 0,
        fullname: "Example User",
        name: "exuser1",
        email: "user@example.com",
        about: "Just a regular user...",
        profile_pic: "",
        boardsList: [
            {id: 0, title: "Example Board"}
        ]
    },
    searchBoardsResults: [],
    message: "",
    currentBoard : {
        title: "",
        id: null,
        lists: [],
        isFav: false
    },
    emptyBoard : {
        title: "Example Board",
        id: 0,
        lists: [
            {
                id: 0,
                title: "TO DO",
                order: 0,
                listItems: [
                    {
                        id: 0,
                        title: "Wash dishes"
                    },
                    {
                        id: 1,
                        title: "Do something"
                    }
                ]
            },
            {
                id: 1,
                order: 1,
                title: "IN WORK",
                listItems: [
                    {
                        id: 0,
                        title: "Walk a dog"
                    }
                ]
            },
            {
                id: 2,
                title: "DONE",
                order: 2,
                listItems: [
                    {
                        id: 0,
                        title: "Get some sleep"
                    },
                    {
                        id: 1,
                        title: "Do nothing"
                    },
                    {
                        id: 2,
                        title: "Wake up"
                    }
                ]
            }
        ]
    }
};

const Reducer = (state, action) => {
    
    if(state === undefined){
        return initialState;
    }

    var newState = state;

    switch(action.type){
        case AT.SET_MESSAGE:
            var newMessage = action.message;
            newState = Object.assign({}, state, {message: newMessage});
            break;
        case AT.SET_CURRENT_BOARD:
            var newCurrentBoard = action.board;
            newState = Object.assign({}, state, {currentBoard: newCurrentBoard});
            break;
        case AT.SAVE_BOARD_TITLE:
            var newBoardTitle = action.title;
            var index = state.user.boardsList.findIndex( (item) => {return item.id === state.currentBoard.id;});
            newState = {
                ...state,
                user: {
                    ...state.user,
                    boardsList : [
                        ...state.user.boardsList.slice(0, index),
                        Object.assign({}, state.user.boardsList[index], {id: state.currentBoard.id, title: action.title}),
                        ...state.user.boardsList.slice(index + 1)
                    ]
                },
                currentBoard: {
                    ...state.currentBoard,
                    title: action.title
                }
            };
            break;
        case AT.SORT_LISTS:
            let newLists = [];

            if(action.orders !== null){
                for(let i = 0; i < action.orders.length; i++){
                    for(let j = 0; j < state.currentBoard.lists.length; j++){
                        if( action.orders[i] === state.currentBoard.lists[j].id){
                            newLists.push(state.currentBoard.lists[j]);
                            newLists[i].order = i;
                        }
                    }
                }
            }
            else{
                newLists = state.currentBoard.lists;
            }

            newState = {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    lists : newLists
                }
            };

            break;
        case AT.REMOVE_BOARD:
            var index = state.user.boardsList.findIndex( (item) => {return item.id === action.id});
            newState = {
                ...state,
                user: {
                    ...state.user,
                    boardsList : [
                        ...state.user.boardsList.slice(0, index),
                        ...state.user.boardsList.slice(index + 1)
                    ]
                }
            };
            break;
        case AT.SEARCH_BOARD:

            let searchedBoards = [];
            if(action.title !== ""){
                searchedBoards = state.user.boardsList.
                filter( (board) => {
                    return board.title.
                    toLowerCase().
                    match(new RegExp(action.title.toLowerCase()), 'i') !== null;
                });
            }

            newState = {
                ...state,
                searchBoardsResults : searchedBoards 
            };
            break;
        case AT.ADD_BOARD:
            newState = {
                ...state,
                user : {
                    ...state.user,
                    boardsList : [
                        ...state.user.boardsList.push(action.board)
                    ]
                }
            }
            break;
        default:
            console.error(`There is no defined action like ${action.type}`);
            break;
    }

    return newState;

};

export default Reducer;