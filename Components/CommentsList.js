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
            comments = this.props.item.comments.map(propsToChildren);
        }

        return (
            <ul id="CommentsList">
                {comments}
            </ul>
        );

    }

}

function fetchComments(){
    $.get(`${appConfig.host}/comments/${this.props.item.id}`).
    done( (data) => {
        if(data.error){
            setMessage.call(this, "fail", data.error);
        }
        this.props.dispatch(Actions.loadComments(this.props.list.id, this.props.item.id, data));
    }).
    fail( (error) => {
        setMessage.call(this, "fail", "SERVER ERROR");
    });
}

function propsToChildren(element){
    return <Comment key={element.id} content={element} />
}

export default CommentsList;