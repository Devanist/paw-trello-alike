import React, {Component} from 'react';
import {Actions, setMessage} from '../Actions/Actions';
import $ from 'jquery';
import appConfig from '../config';

import CommentsList from './CommentsList';
import CommentsStyles from '../Styles/Comments.scss';
import AddLabelBox from './AddLabelBox';
import AddScheduleBox from './AddScheduleBox';
import EventLog from './EventLog';

import Language from '../Languages/Language';

class DetailsBox extends Component{

    constructor(){
        super();

        this.state = {
            displayAddBox: ""
        };

    }

    render(){
        let labels = "";
        let schedule = "";
        if(this.props.item.labels){
            labels = <section><h3>Labels:</h3>{this.props.item.labels.map(stateToLabels.bind(this))}</section>
        }
        if(this.props.item.schedule !== null && this.props.item.schedule !== undefined){
            schedule = <h3>Schedule on {this.props.item.schedule.date} at {this.props.item.schedule.time}</h3>
        }

        let addBox = "";

        switch(this.state.displayAddBox){
            case "Label":
                addBox = <AddLabelBox lang={this.props.lang} key="AddLabelBox" listId={this.props.list.id} itemId={this.props.item.id} activeLabels={this.props.item.labels} dispatch={this.props.dispatch} onClose={closeAddBox.bind(this)} />;
                break;
            case "Schedule":
                addBox = <AddScheduleBox lang={this.props.lang} key="AddScheduleBox" dispatch={this.props.dispatch} onClose={closeAddBox.bind(this)} listId={this.props.list.id} itemId={this.props.item.id} currentSchedule={this.props.item.schedule} />;
                break;
            default: 
                addBox = "";
        }

        return (
            <section id="DetailsBox">
                <span id="closeDetailsBox" className="closePanel" onClick={this.props.onClose} title="Close window"></span>
                <h2>{this.props.item.title}</h2>
                <p id="itemLocation">in list {this.props.list.title}</p>
                <section>
                    {labels}
                    {schedule}
                    <h2>{Language[this.props.lang].DetailsBox.h2}</h2>
                    <textarea placeholder={Language[this.props.lang].DetailsBox.textarea} id="commentContent"></textarea>
                    <input type="submit" value={Language[this.props.lang].DetailsBox.submit} id="addCommentSubmit" onClick={submitNewComment.bind(this)}/>
                    <EventLog itemLog={this.props.item.eventLog} itemId={this.props.item.id} dispatch={this.props.dispatch}/>
                    <CommentsList lang={this.props.lang} item={this.props.item} listId={this.props.list.id} dispatch={this.props.dispatch} />
                </section>
                <aside>
                    <h2>{Language[this.props.lang].DetailsBox.asideh2}</h2>
                    <h3 onClick={displayAddBox.bind(this)}>{Language[this.props.lang].DetailsBox.addLabel}</h3>
                    <h3 onClick={displayAddBox.bind(this)}>{Language[this.props.lang].DetailsBox.addSchedule}</h3>
                </aside>
                {addBox}
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

function displayAddBox(e){

    let what = $(e.target).text();

    this.setState({
        displayAddBox : what
    });
}

function closeAddBox(){
    this.setState({
        displayAddBox: ""
    });
}

function stateToLabels(element){
    return <span key={`${this.props.item.id}_${element}`} className={`listItemLabel ${element}`}></span>
}

export default DetailsBox;