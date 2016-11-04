import React, {Component} from 'react';
import {Actions, setMessage} from '../Actions/Actions';
import $ from 'jquery';
import appConfig from '../config';

class DetailsBox extends Component{

    render(){

        return (
            <section id="DetailsBox">
                <span id="closeDetailsBox" onClick={this.props.onClose} title="Close window"></span>
                <h2>{this.props.item.title}</h2>
                <p id="itemLocation">in list {this.props.list.title}</p>
                <h2>Add a comment</h2>
                <textarea placeholder="Write a comment..." id="commentContent"></textarea>
                <input type="submit" value="Send" id="addCommentSubmit" onClick={submitNewComment.bind(this)}/>
            </section>
        );

    }

    componentDidMount(){

        if(this.props.item.comments === undefined || this.props.item.comments === null){
            fetchComments.call(this);
        }

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

function submitNewComment(){
    $.post(`${appConfig.host}/comment`, {comment: $("#commentContent").val()}).
    done( (data) => {
        if(data.error){
            setMessage.call(this, "fail", data.error);
        }
        this.props.dispatch(Actions.addComment(this.props.list.id, this.props.item.id, $("#commentContent").val()));
        setMessage.call(this, "success", "Your comment was saved.");
    }).
    fail( (error) => {
        setMessage.call(this, "fail", "SERVER ERROR");
    });
}

export default DetailsBox;