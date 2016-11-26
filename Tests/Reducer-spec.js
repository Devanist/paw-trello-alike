import Reducer from '../Reducer.js';
import {Actions, AT} from '../Actions/Actions';

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
            {id: 0, title: "Example Board", isFav: "fav"}
        ]
    },
    messagePanel: {
        message: "",
        result: "hidden"
    },
    searchBoardsResults: [],
    currentBoard : {
        title: "Example Board",
        id: 0,
        isFav: "fav",
        lists: [
            {
                id: 0,
                title: "TO DO",
                listItems: [
                    {
                        id: 0,
                        title: "Wash dishes",
                        labels: [
                            "red",
                            "green"
                        ]
                    },
                    {
                        id: 1,
                        title: "Do something",
                        comments: [
                            {
                                id: 0,
                                author: "Example User",
                                addDate: "04-11-2016 15:01:23",
                                text: "Something productive"
                            },
                            {
                                id: 1,
                                author: "Anonymous",
                                addDate: "04-11-2016 15:40:14",
                                text: "Like commenting tasks"
                            }
                        ]
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
    },
    emptyBoard : {
        title: "Example Board",
        id: 0,
        lists: [
            {
                id: 0,
                title: "TO DO",
                order: 0,
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
                order: 1,
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
                order: 2,
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

describe('Reducer', () => {
    
    it("should set the message panel text to successful", () => {
        let resultState = Reducer(initialState, Actions.setMessage("success", "Testing text"));
        expect(resultState.messagePanel.result).toEqual("success");
        expect(resultState.messagePanel.message).toEqual("Testing text");
    });

    it("should set user to null when logout", () => {
        let resultState = Reducer(initialState, Actions.logout());
        expect(resultState.user).toBe(null);
    });

    it("should add new list to current board", () => {
        let newList = {
            id: 3,
            title: "TEST",
            order: 3,
            listItems: [
                {
                    id: 5,
                    title: "Get some sleep"
                },
                {
                    id: 6,
                    title: "Do nothing"
                },
                {
                    id: 7,
                    title: "Wake up"
                }
            ]
        };
        let resultState = Reducer(initialState, Actions.addList(newList));
        expect(resultState.currentBoard.lists).toContain(newList);
    });

    it("should set the board as favourite", () => {
        let resultState = Reducer(initialState, Actions.setFav(""));
        expect(resultState.currentBoard.isFav).toEqual("");

        resultState = Reducer(initialState, Actions.setFav("fav"));
        expect(resultState.currentBoard.isFav).toEqual("fav");
    });

    it("should remove the list item", () => {
        let removedListItem = {
            id: 0,
            title: "Wash dishes",
            labels: [
                "red",
                "green"
            ]
        };
        let resultState = Reducer(initialState, Actions.removeListItem(0, 0));
        expect(resultState.currentBoard.lists[0].listItems).not.toContain(removedListItem);
    });

});