import React, {Component} from 'react';
import $ from 'jquery';
import appConfig from '../config';
import {Actions} from '../Actions/Actions';

class ListItem extends Component{

    constructor(){
        super();
        this.oldTitle = "";
    }

    render(){

        return (
            <section className="listItem" id={`list_${this.props.listID}_listItem_${this.props.listItem.id}`}>
                <h3 id="listItemTitle" contentEditable="false">{this.props.listItem.title}</h3>
                <span className="editListItemTitle" ></span>
                <span className="saveListItemTitle hidden"></span>
                <span className="cancelListItemTitle hidden"></span>
                <span className="removeListItem"></span>
            </section>
        )
    }

    componentDidMount(){

        $(".editListItemTitle").on("click", handleEditListItem.bind(this));

        $(".saveListItemTitle").on("click", handleSaveListItemTitle.bind(this));

        $(".cancelListItemTitle").on("click", handleCancelListItemTitle.bind(this));
    }

}

function handleEditListItem(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    let parent = $(e.target).parent();
    parent.find(".saveListItemTitle, .cancelListItemTitle, .editListItemTitle").toggleClass("hidden");
    let title = parent.find("#listItemTitle");
    this.oldTitle = title.text().substr();
    title.attr('contenteditable', 'true');
    title.get(0).focus();
}

function handleSaveListItemTitle(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    let parent = $(e.target).parent();

    parent.find(".cancelListItemTitle, .saveListItemTitle, .editListItemTitle").toggleClass("hidden");
    parent.find("#listItemTitle").attr('contenteditable', 'false');
    $.post(`${appConfig.host}/saveListItemTitle`, {id: this.props.listItem.id, title: parent.find("#listItemTitle").text()}).
    done( (data) => { 
        if(data.error){
            this.props.dispatch(Actions.setMessage("fail", "ERROR"));
            parent.find("#listItemTitle").text(this.oldTitle);
        }
        else{
            this.props.dispatch(Actions.saveListItemTitle( $("#listItemTitle").text()));
        }
    }).
    fail( (error) => {
        this.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
        parent.find("#listItemTitle").text(this.oldTitle);
    });
}

function handleCancelListItemTitle(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    let parent = $(e.target).parent();
    parent.find("#listItemTitle").text(this.oldTitle);
    parent.find("#listItemTitle").attr('contenteditable', 'false');
    parent.find(".cancelListItemTitle, .saveListItemTitle, .editListItemTitle").toggleClass("hidden");
}

export default ListItem;