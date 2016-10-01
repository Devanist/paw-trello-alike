const initialState = {
    user: null,
};

const Reducer = (state, action) => {
    
    if(state === undefined){
        return initialState;
    }

    var newState = state;

    switch(action.type){
        default:
            console.error(`There is no defined action like ${action.type}`);
            return newState;
    }

};

export default Reducer;