import {AT} from './Actions/Actions';

/*
let user = localStorage.getItem('user') || null;
*/

const initialState = {
    user: {
        id: 0,
        fullname: "Example User",
        name: "exuser1",
        email: "user@example.com",
        about: "Just a regular user...",
        token: "as@$AX325d",
        profile_pic: "",
        boardsList: [
            {id: 0, name: "Example Board"}
        ]
    },
    messagePanel: {
        message: "",
        result: "hidden"
    },
    currentBoard : {
        title: "Example Board",
        id: 0,
        lists: [
            {
                id: 0,
                title: "TO DO",
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
            newState = Object.assign({}, state, {messagePanel: {message: action.message, result: action.result}});
            break;
        case AT.LOGOUT:
            var newUser = null;
            newState = Object.assign({}, state, {user: newUser});
            localStorage.removeItem('user');
            break;
        case AT.LOGIN:
            newState = Object.assign({}, state, {user: action.user});
            localStorage.setItem('user', action.user);
            break;
        default:
            console.error(`There is no defined action like ${action.type}`);
            break;
    }

    return newState;

};

export default Reducer;