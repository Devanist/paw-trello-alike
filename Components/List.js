import React, {Component} from 'react';
import $ from 'jquery';
import ListItem from './ListItem';
import appConfig from '../config';
import {Actions, setMessage} from '../Actions/Actions';
import Language from '../Languages/Language';

class List extends Component{

    constructor(){
        super();
        this.oldTitle = "";
        this.addNewListItem = this.addNewListItem.bind(this);
    }

    toggleListItemNameInput(event) {
        $(event.target).next().toggleClass("hidden");
    }

    toggleListItemNameInputAddCancel(event) {
        $(event.target).parent().toggleClass("hidden");
    }

    addNewListItem(){

        const id = this.props.list.id;

        $.ajax(`${appConfig.host}/listitem`, {
            method : "POST",
            data : {
                title: $(`#add_list_item_title_${id}`).val(),
                labels: [],
                schedule: "",
                listId: id
            },
            headers : {
                "Accept": "application/json"
            }
        }).
        done((data) => {
            if(data.error){
                this.props.dispatch(Actions.setMessage("fail", data.error));
            }
            this.props.dispatch(Actions.addListItem(data, id));
        }).
        fail( (err) => {
            this.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
        });
    }

  render(){

        return (
            <section className="list" id={`list_${this.props.list.id}`}>
                <span className="removeList" title="Remove this list"> </span>
                <span className="archivizeList" title="Archivize this list" onClick={archivizeList.bind(this)}> </span>
                <h3 className="listTitle" contentEditable="false">{this.props.list.title}</h3>
                <span className="editListTitle" ></span>
                <span className="saveListTitle hidden"></span>
                <span className="cancelListTitle hidden" onClick={cancelEditListTitle.bind(this)}></span>
                <section className="listItemsContainer" id={`list_${this.props.list.id}_ItemsContainer`} onDrop={onDropHandler.bind(this)} onDragOver={onDragOverHandler}>
                    {
                        this.props.list.listItems.map( (listItem) => {
                            return <ListItem lang={this.props.lang} key={`list_${this.props.list.id}_listItem_${listItem.id}`} openDetails={this.props.openDetails} list={this.props.list} listItem={listItem} dispatch={this.props.dispatch}/>
                        })
                    }
                </section>
                <div>
                    <section id="addListItemTrigger" onClick={this.toggleListItemNameInput}>
                    </section>
                    <section id="addListItemMenu" className="hidden">
                        <input className="listItemTitleEditor" type="text" id={`add_list_item_title_${this.props.list.id}`} placeholder={Language[this.props.lang].List.add_list_item_title}/>
                        <input type="submit" id={`add_element_listItem_${this.props.list.id}`} value={Language[this.props.lang].List.add_element_listItem} onClick={(event)=>{this.addNewListItem(event); this.toggleListItemNameInputAddCancel(event);}}/>
                        <input type="submit" id="cancel_add_element_listItem" value={Language[this.props.lang].List.cancel_add_element_listItem} onClick={this.toggleListItemNameInputAddCancel}/>
                    </section>
                </div>
            </section>
        )
  }

    componentWillUpdate(){

    }

}

function onDropHandler(e){
    e.preventDefault();
    const data = e.dataTransfer.getData("elementId");
    //e.currentTarget.appendChild(document.getElementById(data));
    let oldListId = e.dataTransfer.getData("oldListId");
    let itemId = e.dataTransfer.getData("itemId");
    let newListId = this.props.list.id;

    this.props.dispatch(Actions.dragListItem(itemId, oldListId, newListId));
}

function onDragOverHandler(e){
    e.preventDefault();
}

function cancelEditListTitle(e){
    e.target.parentElement.querySelector(".listTitle").innerText = this.oldTitle;
    e.target.parentElement.querySelector(".listTitle").setAttribute('contenteditable', 'false');
    e.target.parentElement.querySelectorAll(".cancelListTitle, .saveListTitle").
        forEach( (element) => {
            element.className += " hidden";
        });
    e.target.parentElement.querySelector(".editListTitle").className = e.target.parentElement.querySelector(".editListTitle").className.replace("hidden", "");
}

function archivizeList(e){
    $.post(`${appConfig.host}/archivize`, {id: this.props.list.id}).
        done( (data) => {
            if(data.error){
                setMessage.call(this, "fail", data.error);
            }
            this.props.dispatch(Actions.removeList(this.props.list.id));
        }).
        fail( (error) => {
            setMessage.call(this, "fail", "SERVER ERROR");
        });
}

export default List;