import React, {Component} from 'react';
import {Actions, setMessage} from '../Actions/Actions';
import $ from 'jquery';
import appConfig from '../config';

import CommentsList from './CommentsList';
import CommentsStyles from '../Styles/Comments.scss';
import AddLabelBox from './AddLabelBox';

class DetailsBox extends Component{

    constructor(){
        super();

        this.state = {
            displayAddLabel: false
        };

    }

    render(){
        let labels = "";
        if(this.props.item.labels){
            labels = <section><h3>Labels:</h3>{this.props.item.labels.map(stateToLabels.bind(this))}</section>
        }

        let addLabels = "";
        if(this.state.displayAddLabel){
            addLabels = <AddLabelBox key="AddLabelBox" listId={this.props.list.id} itemId={this.props.item.id} activeLabels={this.props.item.labels} dispatch={this.props.dispatch} onClose={closeAddLabel.bind(this)} />;
        }

        return (
            <section id="DetailsBox">
                <span id="closeDetailsBox" className="closePanel" onClick={this.props.onClose} title="Close window"></span>
                <h2>{this.props.item.title}</h2>
                <p id="itemLocation">in list {this.props.list.title}</p>
                <section>
                    {labels}
                    <h2>Add a comment</h2>
                    <textarea placeholder="Write a comment..." id="commentContent"></textarea>
                    <input type="submit" value="Send" id="addCommentSubmit" onClick={submitNewComment.bind(this)}/>
                    <CommentsList item={this.props.item} dispatch={this.props.dispatch} />
                </section>
                <aside>
                    <h2>Add</h2>
                    <h3 onClick={displayAddLabel.bind(this)}>Label</h3>
                </aside>
                {addLabels}
            </section>
        );

    }

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

function displayAddLabel(){
    this.setState({
        displayAddLabel: true
    });
}

function closeAddLabel(){
    this.setState({
        displayAddLabel: false
    });
}

function stateToLabels(element){
    return <span key={`${this.props.item.id}_${element}`} className={`listItemLabel ${element}`}></span>
}

export default DetailsBox;