import {AT} from './Actions/Actions';

const initialState = {
    user: null,
    message: ""
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