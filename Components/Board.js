import React, {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import List from './List';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/sortable';
import appConfig from '../config';
import {Actions, setMessage} from '../Actions/Actions';
import Language from '../Languages/Language';

import DetailsBox from './DetailsBox';
import SettingBox from './SettingBox';

import DetailsBoxStyle from '../Styles/DetailsBox.scss';

class Board extends Component {

    constructor(){
        super();
        this.editTitle = this.editTitle.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.addNewList = this.addNewList.bind(this);
        this.oldTitle = "";

        this.state = {
            displayDetails: false,
            displayList: null,
            displayItem: null,
            displaySettings: false,
            children: []
        };
    }

    editTitle(){
        $("#saveBoardTitle, #cancelBoardTitle, #editBoardTitle").toggleClass("hidden");

        let title = $("#boardTitle");
        this.oldTitle = title.text().substr();
        title.attr('contenteditable', 'true');
    }

    getBoard(){

        if(this.props && this.props.board){
            this.props.currentBoard = this.props.board;
        }
        else{
            $.get(`${appConfig.host}/board/${this.props.params.id}.json`).
            done( (data) => {
                if(data.error){
                    setMessage.call(this, "fail", data.error);
                    this.props.push('/');
                }
                else{
                    data.lists.forEach( (list) => {
                        list.listItems.forEach( (item) => {
                            item.labels = item.labels.split(",");
                            let datetime = item.schedule.split(",");
                            item.schedule = {
                                date: datetime[0],
                                time: datetime[1]
                            };
                        });
                    });
                    this.props.dispatch(Actions.setCurrentBoard(data));
                }
            }).
            fail( () => {
                setMessage.call(this, "fail", "SERVER ERROR");
                this.props.dispatch(Actions.setCurrentBoard({
                    title: "Example Board",
                    id: 0,
                    archive: {
                        lists: [
                            {
                                title: "DONE YESTERDAY",
                                id: 6
                            }
                        ],
                        items: [{
                            title: "PET A CAT",
                            id: 18,
                            listId: 0
                        }]
                    },
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
                                    ],
                                    schedule : null,
                                    eventLog: [
                                        {
                                            author: "Example User",
                                            action: "creation",
                                            details: "",
                                            date: "21-11-2016,22:12"
                                        }
                                    ]
                                },
                                {
                                    id: 1,
                                    title: "Do something",
                                    schedule : null,
                                    eventLog: [
                                        {
                                            author: "Example User",
                                            action: "creation",
                                            details: "",
                                            date: "21-11-2016,22:12"
                                        }
                                    ],
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
                                    id: 3,
                                    title: "Walk a dog",
                                    schedule : null,
                                    eventLog: [
                                        {
                                            author: "Example User",
                                            action: "creation",
                                            details: "",
                                            date: "21-11-2016,22:12"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: "DONE",
                            listItems: [
                                {
                                    id: 4,
                                    title: "Get some sleep",
                                    schedule : null,
                                    eventLog: [
                                        {
                                            author: "Example User",
                                            action: "creation",
                                            details: "",
                                            date: "21-11-2016,22:12"
                                        }
                                    ]
                                },
                                {
                                    id: 5,
                                    title: "Do nothing",
                                    schedule : null,
                                    eventLog: [
                                        {
                                            author: "Example User",
                                            action: "creation",
                                            details: "",
                                            date: "21-11-2016,22:12"
                                        }
                                    ]
                                },
                                {
                                    id: 6,
                                    title: "Wake up",
                                    schedule : null,
                                    eventLog: [
                                        {
                                            author: "Example User",
                                            action: "creation",
                                            details: "",
                                            date: "21-11-2016,22:12"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }));
                //this.props.push('/');
            });
        }
    }

    componentWillMount(){
        this.getBoard();
    }

    toggleListNameInput() {
        $("#addListMenu").toggleClass("hidden");
    }

    addNewList(){
        $.ajax(`${appConfig.host}/list`, {
            data: {title: $("#add_list_title").val(), boardId: this.props.currentBoard.id},
            headers: {
                "Accept": "application/json"
            },
            method: "POST"
        }).
        done((data) => {
            if(data.error){
                setMessage.call(this, "fail", data.error);
            }
            this.props.dispatch(Actions.addList(data));
            //Dokonczyc \/
            //this.props.router.push(`//`);
        }).
        fail( (err) => {
            setMessage.call(this, "fail", "SERVER ERROR");
        });
    }

    componentWillUnmount(){
        this.props.dispatch(Actions.setCurrentBoard(this.props.emptyBoard));
    }
    
    render(){

        let details = "";
        if(this.state.displayDetails){
            let list = this.props.currentBoard.lists.find( (element) => {return element.id === parseInt(this.state.detailsList)});
            let item = list.listItems.find( (element) => { return element.id === parseInt(this.state.detailsItem)});
            details = <DetailsBox lang={this.props.language} key="DetailsBox" item={item} list={list} onClose={closeDetailsBox.bind(this)} dispatch={this.props.dispatch} lang={this.props.language}/>; 
        }

        return (
                <section id={`board`} className="board">
                    <section>
                        <h2 id="boardTitle" contentEditable="false">{this.props.currentBoard.title}</h2>
                        <span id="editBoardTitle" onClick={this.editTitle}></span>
                        <span id="saveBoardTitle" className="hidden"></span>
                        <span id="cancelBoardTitle" className="hidden"></span>
                        <span id="removeBoard"></span>
                        <span id="favBoard" className={this.props.currentBoard.isFav}></span>
                        <span id="boardSettings" className="settings" onClick={showBoardSettings.bind(this)}> </span>
                        <span id="copyToClipboard"/>
                        <span id="boardShare">
                            <input type="text" id="board_share_textbox" readOnly="true" value={`localhost:8080/#/board/${this.props.currentBoard.id}`} />
                        </span>
                        <section id="listsContainer">
                            {
                                this.props.currentBoard.lists.map( (list) => {
                                    return <List lang={this.props.language} key={`list_${list.id}`} list={list} openDetails={displayDetailsBox.bind(this)} dispatch={this.props.dispatch} boardId={this.props.currentBoard.id} />
                                })
                            }
                        </section>
                        <section id="confirmRemove" className="hidden">
                            <p>{Language[this.props.language].Board.confirmRemove}</p>
                            <div className="confirmation"><p>
                                {Language[this.props.language].Board.ok}
                            </p></div>
                            <div className="abort"><p>{Language[this.props.language].Board.abort}</p></div> 
                        </section>
                        <div>
                        <section id="addListTrigger" onClick={this.toggleListNameInput}>
                        </section>
                        <section id="addListMenu" className="hidden">
                            <input type="text" id="add_list_title" placeholder={Language[this.props.language].Board.add_list_title} />
                            <input type="submit" id="addNewList" value={Language[this.props.language].Board.addNewList} onClick={this.addNewList}/>
                            <input type="submit" id="cancel_addNewList" value={Language[this.props.language].Board.cancel_addNewList}/>
                        </section>
                    </div>
                    {this.state.children}
                </section>
                <SettingBox display={this.state.displaySettings} boardArchive={this.props.currentBoard.archive} />
                {details}
                </section>
            )
    }

    componentDidMount(){

        
        $("#copyToClipboard").on("click", () => {
            let target = $("#board_share_textbox")[0];
            console.log(target.value);
            target.focus();
            target.setSelectionRange(0, target.value.length);
            document.execCommand("copy");
        });

        $("#saveBoardTitle").on("click", () => {
            $("#cancelBoardTitle, #saveBoardTitle, #editBoardTitle").toggleClass("hidden");
            $("#boardTitle").attr('contenteditable', 'false');
            $.post(`${appConfig.host}/saveBoardTitle`, {id: this.props.currentBoard.id, title: $("#boardTitle").text()}).
            done( (data) => {
                if(data.error){
                    setMessage.call(this, "fail", data.error);
                    $("#boardTitle").text(this.oldTitle);
                }
                else{
                    this.props.dispatch(Actions.saveBoardTitle( $("#boardTitle").text()));
                }
            }).
            fail( (error) => {
                setMessage.call(this, "fail", "SERVER ERROR");
                $("#boardTitle").text(this.oldTitle);
            });
        });

        $("#cancelBoardTitle").on("click", () => {
            $("#boardTitle").text(this.oldTitle);
            $("#boardTitle").attr('contenteditable', 'false');
            $("#cancelBoardTitle, #saveBoardTitle, #editBoardTitle").toggleClass("hidden");
        });

        $("#addNewList").on("click", function(){
            $("#addListMenu").toggleClass("hidden");
        });

        $("#cancel_addNewList").on("click", function(){
            $("#addListMenu").toggleClass("hidden");
        });

        $("#removeBoard").on("click", () => {
            let anwser = null;
            $("#confirmRemove").toggleClass("hidden");

            $(".confirmation").on('click', () => {
                handleUserInput.call(this, true);
            });

            $(".abort").on('click', () => {
                handleUserInput.call(this, false);
            });

        });

        $("#listsContainer").
        sortable({cancel: '.list h3, #add_list_item_title, #DetailsBox, .listItem, .listItemTitleEditor'}).
        on("sortstop", listOrderChangeHandler.bind(this));

        $("#favBoard").on("click", () => {

            let fav = "fav";
            if(this.props.currentBoard.isFav === "fav"){
                fav = "";
            }
            $.post(`${appConfig.host}/boards/${this.props.currentBoard.id}`, {fav: fav }).
            done( (data) => {
                if(data.error){
                    setMessage.call(this, "fail", data.error);
                    return;
                }
                this.props.dispatch(Actions.setFav(fav));
            }).
            fail( (error) => {
                setMessage.call(this, "fail", "SERVER ERROR");
            });

        });

    }
}

function listOrderChangeHandler(){
    let lists = $("#listsContainer .list:not(.ui-sortable-placeholder)");
    let orders = [];
    
    for(let list in lists){
        if(lists.hasOwnProperty(list)){
            
            if(lists.get(list).id){
                orders.push(parseInt(lists.get(list).id.substr(5)));
            }

        }

    }

    $.post(`${appConfig.host}`, orders).
    done( (data) => {
        if(data.error){
            setMessage.call(this, "fail", data.error);
            //this.props.dispatch(Actions.sortLists());
            this.props.router.push(`/board/${this.props.board.id}`);
            return;
        }
        this.props.dispatch(Actions.sortLists(orders));
    }).
    fail( (error) => {
        setMessage.call(this, "fail", "SERVER ERROR");
        //this.props.dispatch(Actions.sortLists());
        this.props.router.push(`/board/${this.props.board.id}`);
    });

}

function handleUserInput(anwser){
    
    $("#confirmRemove").addClass("hidden");

    if(anwser){
        $.get(`${appConfig.host}/removeBoard/${this.props.currentBoard.id}`).
        done( (data) => {
            if(data.error){
                setMessage.call(this, "fail", data.error);
            }
            else{
                setMessage.call(this, "success", `Board ${this.props.currentBoard.title} was removed.`);
                this.props.dispatch(Actions.removeBoard(this.props.currentBoard.id));
                this.props.router.push('/');
            }
        }).
        fail( (error) => {
            setMessage.call(this, "fail", "SERVER ERROR");
            this.props.dispatch(Actions.removeBoard(this.props.currentBoard.id));
            this.props.router.push('/');
        });
    }
}

Board = withRouter(Board, {withRef: true});

function mapStateToProps(state){
    return state;
}

function displayDetailsBox(e, listId, itemId){
    this.setState({
        displayDetails : true,
        detailsList: listId,
        detailsItem : itemId
    });
}

function closeDetailsBox(e){
    e.stopPropagation();
    this.setState({
        displayDetails : false,
        detailsList: null,
        detailsItem: null
    });
}

function showBoardSettings(e){
    
    this.setState({
        displaySettings: !this.state.displaySettings
    });    

}

export default connect(mapStateToProps)(Board);