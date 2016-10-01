export const AT = {
    SET_MESSAGE: 'SET_MESSAGE'
};

export let Actions = {
    setMessage : (message) => {
        return {
            type: AT.SET_MESSAGE,
            message: message
        };
    }
};