import {AT} from './Actions/Actions';

/*
let user = localStorage.getItem('user') || null;
*/

const initialState = {
    language: "en",
    user: {
        id: 0,
        fullname: "Example User",
        name: "exuser1",
        email: "user@example.com",
        about: "Just a regular user...",
        token: "as@$AX325d",
        profile_pic: "",
        boardsList: [
            {id: 0, title: "Example Board", isFav: "fav"}
        ]
    },
    messagePanel: {
        message: "",
        result: "hidden"
    },
    searchBoardsResults: [],
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
    let modifiedListIndex;
    let removedListIndex;
    let modifiedItemIndex;

    switch(action.type){
        case AT.SET_MESSAGE:

            let newResult = action.result;
            let newMessage = action.message;

            newState = {
                ...state,
                messagePanel: {
                    result : newResult,
                    message : newMessage
                }
            };
            break;
        case AT.LOGOUT:
            var newUser = null;
            newState = {
                ...state,
                user: newUser
            };
            localStorage.removeItem('user');
            break;
        case AT.LOGIN:
            newState = {
                ...state,
                user : action.user
            };
            localStorage.setItem('user', action.user);
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
        case AT.ADD_LIST:
            newState = {
                    ...state,
                    currentBoard: {
                        ...state.currentBoard,
                        lists : [
                        ...state.currentBoard.lists.concat(action.list)
                    ]
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
        case AT.REMOVE_LIST:

            removedListIndex = state.currentBoard.lists.findIndex( (element) => {
                return element.id === parseInt(action.listId);
            });

            newState = {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    lists : [
                        ...state.currentBoard.lists.slice(0, removedListIndex),
                        ...state.currentBoard.lists.slice(removedListIndex + 1)
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

        case AT.SET_FAVOURITE_BOARD:
            newState = {
                ...state,
                currentBoard : {
                    ...state.currentBoard,
                    isFav: action.fav
                }
            };
            break;
        case AT.REMOVE_LISTITEM:
            
            modifiedListIndex = state.currentBoard.lists.findIndex( (element) => {
                return element.id === parseInt(action.listId);
            });

            let removedItemIndex = state.currentBoard.lists[modifiedListIndex].listItems.findIndex( (element) => {
                return element.id === action.id
            });

            let newListItems = [
                state.currentBoard.lists[modifiedListIndex].listItems.slice(removedItemIndex),
                state.currentBoard.lists[modifiedListIndex].listItems.slice(removedItemIndex + 1)
            ];

            newState = {
                ...state,
                currentBoard : {
                    ...state.currentBoard,
                    lists: [
                        ...state.currentBoard.lists.slice(0, modifiedListIndex),
                        Object.assign({}, state.currentBoard.lists[modifiedListIndex], {listItems: newListItems}),
                        ...state.currentBoard.lists.slice(modifiedListIndex + 1)
                    ]
                }
            };
            break;
        case AT.CHANGE_LABEL:

            modifiedListIndex = state.currentBoard.lists.findIndex( (element) => {
                return element.id === parseInt(action.listId);
            });

            modifiedItemIndex = state.currentBoard.lists[modifiedListIndex].listItems.findIndex( (element) => {
                return element.id === parseInt(action.itemId);
            });

            let newLabels = [];

            if( state.currentBoard.lists[modifiedListIndex].listItems[modifiedItemIndex].labels &&
                state.currentBoard.lists[modifiedListIndex].listItems[modifiedItemIndex].labels.findIndex( (element) => {
                    return element === action.color
                }) > -1){
                
                newLabels = state.currentBoard.lists[modifiedListIndex].listItems[modifiedItemIndex].labels.filter( (element) => {
                    return element !== action.color
                })

            }
            else{

                if(state.currentBoard.lists[modifiedListIndex].listItems[modifiedItemIndex].labels) {
                    newLabels = state.currentBoard.lists[modifiedListIndex].listItems[modifiedItemIndex].labels.concat(action.color);
                }
                else {
                    state.currentBoard.lists[modifiedListIndex].listItems[modifiedItemIndex].labels = [];
                    newLabels = state.currentBoard.lists[modifiedListIndex].listItems[modifiedItemIndex].labels.concat(action.color);
                }
            }

            newState = {
                ...state,
                currentBoard : {
                    ...state.currentBoard,
                    lists : [
                        ...state.currentBoard.lists.slice(0, modifiedListIndex),
                        {
                            ...state.currentBoard.lists[modifiedListIndex],
                            listItems : [
                                ...state.currentBoard.lists[modifiedListIndex].listItems.slice(0, modifiedItemIndex),
                                {
                                    ...state.currentBoard.lists[modifiedListIndex].listItems[modifiedItemIndex],
                                    labels : newLabels
                                },
                                ...state.currentBoard.lists[modifiedListIndex].listItems.slice(modifiedItemIndex + 1)
                            ]
                        },
                        ...state.currentBoard.lists.slice(modifiedListIndex + 1)
                    ]
                }
            };
            break;
        case AT.SAVE_SCHEDULE:
            
            modifiedListIndex = state.currentBoard.lists.findIndex( (element) => {
                return element.id === parseInt(action.listId);
            });

            let modifiedItemIndex = state.currentBoard.lists[modifiedListIndex].listItems.findIndex( (element) => {
                return element.id === parseInt(action.itemId);
            });

            let newSchedule = action.schedule;

            newState = {
                ...state,
                currentBoard : {
                    ...state.currentBoard,
                    lists : [
                        ...state.currentBoard.lists.slice(0, modifiedListIndex),
                        {
                            ...state.currentBoard.lists[modifiedListIndex],
                            listItems : [
                                ...state.currentBoard.lists[modifiedListIndex].listItems.slice(0, modifiedItemIndex),
                                {
                                    ...state.currentBoard.lists[modifiedListIndex].listItems[modifiedItemIndex],
                                    schedule : newSchedule
                                },
                                ...state.currentBoard.lists[modifiedListIndex].listItems.slice(modifiedItemIndex + 1)
                            ]
                        },
                        ...state.currentBoard.lists.slice(modifiedItemIndex + 1)
                    ]
                }
            }

            break;
        case AT.CHANGE_LANGUAGE:

            let newLang = action.lang;
            newState = {
                ...state,
                language : newLang
            };
            break;
        default:
            console.error(`There is no defined action like ${action.type}`);
            break;
    }

    return newState;

};

export default Reducer;