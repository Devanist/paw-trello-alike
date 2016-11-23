import React, {Component} from 'react';

class AddScheduleBox extends Component{

    render(){

        return(
            <section className="AddDetailBox" id="AddScheduleBox">
                <span id="closeAddSchedule" className="closePanel" onClick={this.props.onClose}></span>
                <h2>Add schedule</h2>

            </section>
        );

    }

}

export default AddScheduleBox;