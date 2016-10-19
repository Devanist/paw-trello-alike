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
            <section className="listItem" id={`listItem_${this.props.listItem.id}`}>
                <h3 id="listItemTitle" contentEditable="false">{this.props.listItem.title}</h3>
                <span className="editListItemTitle" ></span>
                <span className="saveListItemTitle hidden"></span>
                <span className="cancelListItemTitle hidden"></span>
            </section>
        )
    }

    componentDidMount(){
        let that = this;

        $(".editListItemTitle").on("click", function() {
            $(this).parent().find(".saveListItemTitle, .cancelListItemTitle, .editListItemTitle").toggleClass("hidden");
            //console.log($(this).parent().find(".saveListItemTitle, .cancelListItemTitle, .editListItemTitle"));
            let title = $(this).parent().find("#listItemTitle");
            that.oldTitle = title.text().substr();
            //console.log("tytul: " + title);
            title.attr('contenteditable', 'true');
            title.get(0).focus();

        });

        $(".saveListItemTitle").on("click", function() {
            $(this).parent().find(".cancelListItemTitle, .saveListItemTitle, .editListItemTitle").toggleClass("hidden");
            $(this).parent().find("#listItemTitle").attr('contenteditable', 'false');
            $.post(`${appConfig.host}/saveListItemTitle`, {id: that.props.list.id, title: $("#listItemTitle").text()}).
            done( (data) => { 
                if(data.error){
                    that.props.dispatch(Actions.setMessage("fail", "ERROR"));
                    $(this).parent().find("#listItemTitle").text(that.oldTitle);
                }
                else{
                    that.props.dispatch(Actions.saveListItemTitle( $("#listItemTitle").text()));
                }
            }).
            fail( (error) => {
                that.props.dispatch(Actions.setMessage("fail", "SERVER ERROR"));
                $(this).parent().find("#listItemTitle").text(that.oldTitle);
            });
        });

        $(".cancelListItemTitle").on("click", function() {
            $(this).parent().find("#listItemTitle").text(that.oldTitle);
            $(this).parent().find("#listItemTitle").attr('contenteditable', 'false');
            $(this).parent().find(".cancelListItemTitle, .saveListItemTitle, .editListItemTitle").toggleClass("hidden");
        });
    }

}

export default ListItem;