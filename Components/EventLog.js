import React, {Component} from 'react';
import appConfig from '../config';
import {Actions, setMessage} from '../Actions/Actions';
import $ from 'jquery';

class EventLog extends Component{

    constructor(){
        super();
        this.state = {
            triggerText : "Show",
            logsContainerClass : "hidden"
        };
    }

    render(){

        let logs = "Event log is empty";
        if(this.props.itemLog.length > 0){
            logs = this.props.itemLog.map(logsToListElements.bind(this));
        }

        return (
            <section id="EventLog">
                <h3>Event log</h3>
                <h4 onClick={toggleEventLog.bind(this)}>{this.state.triggerText}</h4>
                <ul id="logsContainer" className={this.state.logsContainerClass}>
                    {logs}
                </ul>
            </section>
        );

    }

    componentDidMount(){
        $.get(`${appConfig.host}/eventLog/${this.props.itemId}`).
            done( (data) => {
                if(data.error){
                    setMessage.call(this, "fail", data.error);
                }
                this.props.dispatch(Actions.loadEventLog(data));
            }).
            fail( (error) => {
                setMessage.call(this, "fail", "SERVER ERROR");
            });
    }

}

function toggleEventLog(){
    if(this.state.triggerText === "Show"){
        
        this.setState({
            triggerText: "Hide",
            logsContainerClass: ""
        });

    }
    else{
        
        this.setState({
            triggerText: "Show",
            logsContainerClass: "hidden"
        });

    }
}

function logsToListElements(log){

    let action = "";
    switch(log.action){
        case "creation":
            action = " created this item "
            break;
        default:
            break;
    }

    return <li>
        <h4>{log.author} {action} {log.details}</h4>
        <h5>{log.date}</h5>
    </li>
}

export default EventLog;