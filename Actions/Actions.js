export const AT = {
    SET_MESSAGE: 'SET_MESSAGE',
    SET_CURRENT_BOARD: 'SET_CURRENT_BOARD',
    SAVE_BOARD_TITLE: 'SAVE_BOARD_TITLE',
    REMOVE_BOARD: 'REMOVE_BOARD'
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
    removeBoard : (id) => {
        return {
            type: AT.REMOVE_BOARD,
            id: id
        };
    }
};