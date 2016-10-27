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
    message: "",
    currentBoard : {
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
            const index = state.user.boardsList.findIndex( (item) => {return item.id === state.currentBoard.id;});
            console.log(index);
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
            for(let i = 0; i < action.orders.length; i++){
                for(let j = 0; j < state.currentBoard.lists.length; j++){
                    if( action.orders[i] === state.currentBoard.lists[j].id){
                        newLists.push(state.currentBoard.lists[j]);
                        newLists[i].order = i;
                    }
                }
            }

            newState = {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    lists : newLists
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