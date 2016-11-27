import React, {Component} from 'react';
import $ from 'jquery';
import appConfig from '../config';
import {Actions, setMessage} from '../Actions/Actions';

import Comment from './Comment';

class CommentsList extends Component{

    componentDidMount(){

        if(this.props.item.comments === undefined || this.props.item.comments === null){
            fetchComments.call(this);
        }

    }

    render(){

        let comments = "";
        if(this.props.item.comments){
            comments = this.props.item.comments.map(propsToChildren.bind(this));
        }

        return (
            <ul id="CommentsList">
                {comments}
            </ul>
        );

    }

}

function fetchComments(){

    const listId = this.props.listId;
    const itemId = this.props.item.id;

    $.get(`${appConfig.host}/listitem/${itemId}.json`).
    done( (data) => {
        if(data.error){
            setMessage.call(this, "fail", data.error);
        }
        this.props.dispatch(Actions.loadComments(listId, itemId, data));
    }).
    fail( (error) => {
        setMessage.call(this, "fail", "SERVER ERROR");
    });
}

function propsToChildren(element){
    return <Comment lang={this.props.lang} key={element.id} content={element} />
}

export default CommentsList;