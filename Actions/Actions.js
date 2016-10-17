export const AT = {
    SET_MESSAGE: 'SET_MESSAGE',
    LOGOUT: 'LOGOUT',
    LOGIN: 'LOGIN'
};

export let Actions = {
    setMessage : (result, message = "message") => {

        if(result === "hide"){
            result = "hidden";
        }

        return {
            type: AT.SET_MESSAGE,
            result: result,
            message: message
        };
    },
    logout : () => {
        return{
            type: AT.LOGOUT
        };
    },
    login : (user) => {
        return {
            type: AT.LOGIN,
            user: user
        };
    }
};