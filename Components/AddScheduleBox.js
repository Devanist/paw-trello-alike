import React, {Component} from 'react';
import {Actions} from '../Actions/Actions';
import $ from 'jquery';

class AddScheduleBox extends Component{

    render(){

        let currentSchedule = "";
        if(this.props.currentSchedule !== null){
            currentSchedule = <p>Current schedule is on {this.props.currentSchedule.date} at {this.props.currentSchedule.time}</p>;
        }

        return(
            <section className="AddDetailBox" id="AddScheduleBox">
                <span id="closeAddSchedule" className="closePanel" onClick={this.props.onClose}></span>
                <h2>Add schedule</h2>
                Date: <input type="date" id="scheduleDate" name="scheduleDate" placeholder="rrrr-mm-dd" /><br/>
                Time: <input type="time" id="scheduleTime" name="scheduleTime" placeholder="--:--" /><br/>
                <input type="button" id="saveSchedule" value="Save" onClick={saveSchedule.bind(this)} />
                <input type="button" id="deleteSchedule" value="Delete" onClick={deleteSchedule.bind(this)} />
                {currentSchedule}
            </section>
        );

    }

}

function saveSchedule(){
    let schedule = {
        date: $("#scheduleDate").val(),
        time: $("#scheduleTime").val()
    };

    console.log(schedule);

    this.props.dispatch(Actions.saveSchedule(schedule, this.props.listId, this.props.itemId));
}

function deleteSchedule(){
    this.props.dispatch(Actions.saveSchedule(null, this.props.listId, this.props.itemId));
}

export default AddScheduleBox;