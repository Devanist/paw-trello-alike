import React, {Component} from 'react';
import Board from './Board';
import $ from 'jquery';
import ListItem from './ListItem';
import appConfig from '../config';
import {Actions} from '../Actions/Actions';

class List extends Component{

    constructor(){
        super();
        this.oldTitle = "";
    }


    renderListItems(){
        return this.props.list.listItems.map( (listItem) => {
            return <ListItem key={listItem.id} listItem={listItem} />
        });
    }

    //editTitle() {

    //}

    render(){
        const listItems = this.renderListItems();

        return (
            <section className="list" id={`list_${this.props.list.id}`}>
                <h3 id="listTitle" contentEditable="false">{this.props.list.title}</h3>
                <span className="editListTitle" ></span>
                <span className="saveListTitle hidden"></span>
                <span className="cancelListTitle hidden"></span>
                <section>{listItems}</section>
            </section>
        )
    }

    componentDidMount(){
        let that = this;

        $(".editListTitle").on("click", function() {
            console.log(this);
            $(this).parent().find(".saveListTitle, .cancelListTitle, .editListTitle").toggleClass("hidden");
            console.log(find(".saveListTitle, .cancelListTitle, .editListTitle"));
            let title = $(this).parent().find("#listTitle");
            console.log(title);
            that.oldTitle = title.text().substr();
            title.attr('contenteditable', 'true');
        });


        $(".saveListTitle").on("click", function() {
            $(this).parent().find(".cancelListTitle, .saveListTitle, .editListTitle").toggleClass("hidden");
            $(this).parent().find("#listTitle").attr('contenteditable', 'false');
            $.post(`${appConfig.host}/saveListTitle`, {id: that.props.list.id, title: $("#listTitle").text()}).
            done( (data) => { 
                if(data.error){
                    that.props.dispatch(Actions.setMessage("fail", "ERROR"));
                    $(this).parent().find("#listTitle").text(that.oldTitle);
                }
                else{
                    that.props.dispatch(Actions.saveListTitle( $("#listTitle").text()));
                }
            }).
            fail( (error) => {
                that.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
                $(this).parent().find("#listTitle").text(that.oldTitle);
            });
        });

        $(".cancelListTitle").on("click", function() {
            $(this).parent().find("#listTitle").text(that.oldTitle);
            $(this).parent().find("#listTitle").attr('contenteditable', 'false');
            $(this).parent().find(".cancelListTitle, .saveListTitle, .editListTitle").toggleClass("hidden");
        });
    }

}

export default List;