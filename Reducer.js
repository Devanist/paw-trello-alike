import {AT} from './Actions/Actions';

const initialState = {
    user: {
        id: 0,
        name: "Example User",
        profile_pic: "https://cdn4.iconfinder.com/data/icons/mayssam/512/user-128.png"
    },
    message: "",
    currentBoard : {
        title: "Example Board",
        id: 0,
        lists: [
            {
                id: 0,
                title: "TO DO"
            },
            {
                id: 1,
                title: "IN WORK"
            },
            {
                id: 2,
                title: "DONE"
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
        default:
            console.error(`There is no defined action like ${action.type}`);
            break;
    }

    return newState;

};

export default Reducer;