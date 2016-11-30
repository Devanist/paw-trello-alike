export const AT = {
    SET_MESSAGE: 'SET_MESSAGE',
    SET_CURRENT_BOARD: 'SET_CURRENT_BOARD',
    SAVE_BOARD_TITLE: 'SAVE_BOARD_TITLE',
    ADD_LIST : 'ADD_LIST',
    LOGOUT: 'LOGOUT',
    LOGIN: 'LOGIN',
    SORT_LISTS: 'SORT_LISTS',
    REMOVE_BOARD: 'REMOVE_BOARD',
    REMOVE_LIST: 'REMOVE_LIST',
    SEARCH_BOARD: 'SEARCH_BOARD',
    LOAD_COMMENTS: 'LOAD_COMMENTS',
    ADD_BOARD: 'ADD_BOARD',
    REMOVE_LISTITEM: 'REMOVE_LISTITEM',
    SET_FAVOURITE_BOARD: 'SET_FAVOURITE_BOARD',
    CHANGE_LABEL: 'CHANGE_LABEL',
    SAVE_SCHEDULE: 'SAVE_SCHEDULE',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    LOAD_ARCHIVE: 'LOAD_ARCHIVE',
    DRAG_LISTITEM: 'DRAG_LISTITEM',
    ADD_LISTITEM : 'ADD_LISTITEM'
};

export function setMessage(result, message){
    this.props.dispatch(Actions.setMessage(result, message));
    setTimeout(() => {
        this.props.dispatch(Actions.setMessage("hide"));
    }, 5000);
}

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
    },
    addListItem : (item, listId) => {
        return {
            type: AT.ADD_LISTITEM,
            item : item,
            listId : listId
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
    },
    sortLists : (orders = null) => {
        return {
            type: AT.SORT_LISTS,
            orders: orders
        };
    },
    removeBoard : (id) => {
        return {
            type: AT.REMOVE_BOARD,
            id: id
        };
    },
    removeList : (listId) => {
        return {
            type: AT.REMOVE_LIST,
            listId: listId
        };
    },
    searchBoard : (title) => {
        return {
            type : AT.SEARCH_BOARD,
            title: title
        };
    },
    addBoard : (board) => {
        return {
            type : AT.ADD_BOARD,
            board: board
        };
    },
    setFav : (fav) => {
        return {
            type: AT.SET_FAVOURITE_BOARD,
            fav: fav
        };
    },
    removeListItem : ( listId, id) => {
        return {
            type: AT.REMOVE_LISTITEM,
            id: id,
            listId: listId
        };
    },
    changeLabel : (color, listId, itemId) => {
        return {
            type: AT.CHANGE_LABEL,
            listId: listId,
            color: color,
            itemId: itemId
        };
    },
    saveSchedule : (datetime, listId, itemId) => {
        return {
            type: AT.SAVE_SCHEDULE,
            schedule: datetime,
            listId: listId,
            itemId: itemId
        };
    },
    changeLanguage : (lang) => {
        return {
            type : AT.CHANGE_LANGUAGE,
            lang : lang
        };
    },
    loadComments : (listId, itemId, data) => {
        return {
            type : AT.LOAD_COMMENTS,
            listId : listId,
            itemId : itemId,
            data : data.commentsList
        };
    },
    loadArchive : (data) => {
        return {
            type: AT.LOAD_ARCHIVE,
            data: data
        };
    },
    dragListItem : (itemId, oldListId, newListId) => {
        return {
            type: AT.DRAG_LISTITEM,
            itemId : itemId,
            oldListId : oldListId,
            newListId : newListId
        };
    }
};