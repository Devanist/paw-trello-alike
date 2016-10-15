export const AT = {
    SET_MESSAGE: 'SET_MESSAGE',
    LOGOUT: 'LOGOUT'
};

export let Actions = {
    setMessage : (message) => {
        return {
            type: AT.SET_MESSAGE,
            message: message
        };
    },
    logout : () => {
        return{
            type: AT.LOGOUT
        };
    }
};