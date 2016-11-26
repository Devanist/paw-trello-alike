import React, {Component} from 'react';
import {Actions} from '../Actions/Actions';
import $ from 'jquery';
import Language from '../Languages/Language';

class AddScheduleBox extends Component{

    render(){

        let currentSchedule = "";
        if(this.props.currentSchedule !== null){
            currentSchedule = <p>{Language[this.props.lang].AddScheduleBox.p[0]} {this.props.currentSchedule.date} {Language[this.props.lang].AddScheduleBox.p[1]} {this.props.currentSchedule.time}</p>;
        }

        return(
            <section className="AddDetailBox" id="AddScheduleBox">
                <span id="closeAddSchedule" className="closePanel" onClick={this.props.onClose}></span>
                <h2>{Language[this.props.lang].AddScheduleBox.h2}</h2>
                {Language[this.props.lang].AddScheduleBox.date}: <input type="date" id="scheduleDate" name="scheduleDate" placeholder="rrrr-mm-dd" /><br/>
                {Language[this.props.lang].AddScheduleBox.time}: <input type="time" id="scheduleTime" name="scheduleTime" placeholder="--:--" /><br/>
                <input type="button" id="saveSchedule" value={Language[this.props.lang].AddScheduleBox.save} onClick={saveSchedule.bind(this)} />
                <input type="button" id="deleteSchedule" value={Language[this.props.lang].AddScheduleBox.delete} onClick={deleteSchedule.bind(this)} />
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