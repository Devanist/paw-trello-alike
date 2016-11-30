import React, {Component} from 'react';
import $ from 'jquery';
import appConfig from '../config';
import {Actions, setMessage} from '../Actions/Actions';
import Language from '../Languages/Language';

class ListItem extends Component{

    constructor(){
        super();
        this.oldTitle = "";
        this.state = {
            labels : []
        };
    }

    render(){

        let labels = "";
        let schedule = "";
        if(Array.isArray(this.props.listItem.labels)){
            labels = this.props.listItem.labels.map(stateToLabels.bind(this));
        }
        if(this.props.listItem.schedule !== null && this.props.listItem.schedule !== undefined){
            schedule = <p>{this.props.listItem.schedule.date}, {this.props.listItem.schedule.time}</p>
        }

        return (
            <section className="listItem" id={`list_${this.props.list.id}_listItem_${this.props.listItem.id}`} draggable="true" onDragStart={onDragStartHandler.bind(this)} onClick={(e) => {this.props.openDetails(e, this.props.list.id, this.props.listItem.id)}}>
                <header>
                    {labels}
                    {schedule}
                </header>
                <h3 onClick={titleClick} id="listItemTitle" contentEditable="false">{this.props.listItem.title}</h3>
                <span className="editListItemTitle" onClick={handleEditListItem.bind(this)}></span>
                <span className="saveListItemTitle hidden" onClick={handleSaveListItemTitle.bind(this)}></span>
                <span className="cancelListItemTitle hidden" onClick={handleCancelListItemTitle.bind(this)}></span>
                <span className="archivizeListItem" onClick={archivizeListItem.bind(this)}></span>
                <span className="removeListItem" title={Language[this.props.lang].ListItem.remove} onClick={handleRemoveListItem.bind(this)}></span>
            </section>
        )
    }

}

function archivizeListItem(e){

    e.stopPropagation();
    e.cancelBubble = true;
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();

    const itemId = this.props.listItem.id;
    const listId = this.props.list.id;

    $.post(`${appConfig.host}/archivizeItem`, {listId : listId, itemId: itemId}).
        done((data) => {
            if(data.error){
                setMessage.call(this, "fail", data.error);
            }
            else{
                this.props.dispatch(Actions.removeListItem(listId, itemId));
            }
        }).
        fail( (error) => {
            setMessage.call(this, "fail", "SERVER ERROR");
        });
}

function handleEditListItem(e) {
    e.stopPropagation();
    e.cancelBubble = true;
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    let parent = $(e.target).parent();
    parent.find(".saveListItemTitle, .cancelListItemTitle, .editListItemTitle").toggleClass("hidden");
    let title = parent.find("#listItemTitle");
    this.oldTitle = title.text().substr();
    title.attr('contenteditable', 'true');
    title.get(0).focus();
}

function handleSaveListItemTitle(e) {
    e.stopPropagation();
    e.cancelBubble = true;
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    let parent = $(e.target).parent();

    parent.find(".cancelListItemTitle, .saveListItemTitle, .editListItemTitle").toggleClass("hidden");
    parent.find("#listItemTitle").attr('contenteditable', 'false');
    $.post(`${appConfig.host}/saveListItemTitle`, {id: this.props.listItem.id, title: parent.find("#listItemTitle").text()}).
    done( (data) => { 
        if(data.error){
            setMessage.call(this, "fail", data.error);
            parent.find("#listItemTitle").text(this.oldTitle);
        }
        else{
            this.props.dispatch(Actions.saveListItemTitle( $("#listItemTitle").text()));
        }
    }).
    fail( (error) => {
        setMessage.call(this, "fail", "SERVER ERROR");
        parent.find("#listItemTitle").text(this.oldTitle);
    });
}

function handleCancelListItemTitle(e) {
    e.stopPropagation();
    e.cancelBubble = true;
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    let parent = $(e.target).parent();
    parent.find("#listItemTitle").text(this.oldTitle);
    parent.find("#listItemTitle").attr('contenteditable', 'false');
    parent.find(".cancelListItemTitle, .saveListItemTitle, .editListItemTitle").toggleClass("hidden");
}

function handleRemoveListItem(e){
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    e.cancelBubble = true;

    let id = $(e.target).
                parent().
                attr("id");

    let listID = id.substr(id.indexOf("_") + 1);
    id = id.substr(id.lastIndexOf("_") + 1);

    $.ajax({
        url: `${appConfig.host}/listItem/${id}`,
        type: 'DELETE'
    }).
    done( (data) => {
        if(data.error){
            setMessage.call(this, "fail", data.error);
        }
        else{
            this.props.dispatch(Actions.removeListItem(listID, id));
        }
    }).
    fail( (error) => {
        setMessage.call(this, "fail", "SERVER ERROR");
        //this.props.dispatch(Actions.removeListItem(listID, id));
    });
}

function titleClick(e){
    if(e.target.getAttribute("contentEditable") === "true"){
        e.stopPropagation();
        if(e.stopImmediatePropagation) e.stopImmediatePropagation();
        e.cancelBubble = true;
    }
}

function stateToLabels(label){
    return <span key={`item_${this.props.listItem.id}_${label}`} className={`listItemLabel ${label}`}></span>
}

function onDragStartHandler(e){
    e.dataTransfer.setData("elementId", e.target.id);
    e.dataTransfer.setData("oldListId", this.props.list.id);
    e.dataTransfer.setData("itemId", this.props.listItem.id);
}

export default ListItem;