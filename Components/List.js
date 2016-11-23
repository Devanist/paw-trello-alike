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
        this.renderListItems = this.renderListItems.bind(this);
    }

    renderListItems(){
        return this.props.list.listItems.map( (listItem) => {
            return <ListItem lang={this.props.lang} key={`listItem_${listItem.id}`} openDetails={this.props.openDetails} list={this.props.list} listItem={listItem} dispatch={this.props.dispatch}/>
        });
    }

    toggleListItemNameInput(event) {
        $(event.target).next().toggleClass("hidden");
        console.log( $(event.target).next() );
    }

    toggleListItemNameInputAddCancel(event) {
        $(event.target).parent().toggleClass("hidden");
        console.log( $(event.target).parent() );
    }

    addNewListItem(){
        /*
        $.post(`${appConfig.host}/cardlist`, {title: $("#add_list_title").val(), boardId: this.props.board.id}).
        done((data) => {
            console.log(data);
            if(data.error){
                this.props.dispatch(Actions.setMessage("fail", data.error));
            }
            this.props.dispatch(Actions.addList(data));
            //Dokonczyc \/
            //this.props.router.push(`//`);
        }).
        fail( (err) => {
            this.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
        });
        */
    }

  render(){

        return (
            <section className="list" id={`list_${this.props.list.id}`}>
                <span className="removeList"> </span>
                <h3 className="listTitle" contentEditable="false">{this.props.list.title}</h3>
                <span className="editListTitle" ></span>
                <span className="saveListTitle hidden"></span>
                <span className="cancelListTitle hidden"></span>
                <section>{this.renderListItems()}</section>
                <div>
                    <section id="addListItemTrigger" onClick={this.toggleListItemNameInput}>
                    </section>
                    <section id="addListItemMenu" className="hidden">
                        <input type="text" id="add_list_item_title" placeholder={Language[this.props.lang].List.add_list_item_title}/>
                        <input type="submit" id="add_element_listItem" value={Language[this.props.lang].List.add_element_listItem} onClick={(event)=>{this.toggleListItemNameInputAddCancel(event); this.addNewListItem(event);}}/>
                        <input type="submit" id="cancel_add_element_listItem" value={Language[this.props.lang].List.cancel_add_element_listItem} onClick={this.toggleListItemNameInputAddCancel}/>
                    </section>
                </div>
            </section>
        )
    }

    componentDidMount(){
        let that = this;

        $(".removeList").on("click", function(e) {
            //let listID = $(this).parent().id.substr(id.indexOf("_") + 1);
            console.log("id listy: " + $(this).parent()[0].id);
            let listID = $(this).parent()[0].id.substr($(this).parent()[0].id.indexOf("_") + 1);
            that.props.dispatch(Actions.removeList(listID));
        });

        $(".editListTitle").on("click", function(e) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            $(this).parent().find(".saveListTitle, .cancelListTitle, .editListTitle").toggleClass("hidden");
            let title = $(this).parent().find(".listTitle");
            console.log(this);
            that.oldTitle = title.text().substr();
            title.attr('contenteditable', 'true');
            title.get(0).focus();

            /*
            title.on("focusout", function() {
                title.text(that.oldTitle);
                title.attr('contenteditable', 'true');
                $(this).parent().find(".cancelListTitle, .saveListTitle, .editListTitle").toggleClass("hidden");
            });
            */
        });

        $(".saveListTitle").on("click", function() {
            $(this).parent().find(".cancelListTitle, .saveListTitle, .editListTitle").toggleClass("hidden");
            $(this).parent().find(".listTitle").attr('contenteditable', 'false');
            $.post(`${appConfig.host}/saveListTitle`, {id: that.props.list.id, title: $(".listTitle").text()}).
            done( (data) => { 
                if(data.error){
                    setMessage.call(this, "fail", data.error);                    
                    $(this).parent().find(".listTitle").text(that.oldTitle);
                }
                else{
                    that.props.dispatch(Actions.saveListTitle( $(this).parent().find("#listTitle").text()));
                }
            }).
            fail( (error) => {
                setMessage.call(this, "fail", "SERVER ERROR");
                $(this).parent().find("#listTitle").text(that.oldTitle);
            });
        });

        $(".cancelListTitle").on("click", function() {
            $(this).parent().find("#listTitle").text(that.oldTitle);
            $(this).parent().find("#listTitle").attr('contenteditable', 'false');
            $(this).parent().find(".cancelListTitle, .saveListTitle, .editListTitle").toggleClass("hidden");
        });
/*
        $("#add_element_listItem").on("click", function(){
            $("#addListItemMenu").toggleClass("hidden");
        });

        $("#cancel_add_element_listItem").on("click", function(){
            $("#addListItemMenu").toggleClass("hidden");
        });
*/


    }

}

export default List;