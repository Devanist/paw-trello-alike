export const AT = {
    SET_MESSAGE: 'SET_MESSAGE',
    SET_CURRENT_BOARD: 'SET_CURRENT_BOARD',
    SAVE_BOARD_TITLE: 'SAVE_BOARD_TITLE',
    ADD_LIST : 'ADD_LIST'
};

export let Actions = {
    setMessage : (message) => {
        return {
            type: AT.SET_MESSAGE,
            message: message
        };
    },
    setCurrentBoard : (board) => {
        return {
            type: AT.SET_CURRENT_BOARD,
            board: board 
        };
    },
    saveBoardTitle : (title) => {
        return {
            type: AT.SAVE_BOARD_TITLE,
            title: title
        };
    },
    addList : (list) => {
        return {
            type: AT.ADD_LIST,
            list: list
        };
    }
};