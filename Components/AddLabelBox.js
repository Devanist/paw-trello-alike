import React, {Component} from 'react';
import {Actions, setMessage} from '../Actions/Actions';

class AddLabelBox extends Component{

    constructor(){
        super();
        this.state = {
            colors: [
                "green",
                "yellow",
                "orange",
                "red",
                "purple",
                "blue"
            ],
            children: [

            ]
        };
    }

    componentDidMount(){
        this.setState({
            children: this.state.colors.map(labelsToComponents.bind(this))
        });
    }

    render(){

        return(
            <section id="AddLabelBox">
                <span id="closeAddLabel" className="closePanel" onClick={this.props.onClose}></span>
                <h2>Labels</h2>
               {this.state.children}
            </section>
        );

    }

}

function labelsToComponents(color){

    function ofColor(element){
        return element === color;
    }

    let active = "";
    if(this.props.activeLabels && this.props.activeLabels.findIndex(ofColor) > -1){
        active = "✓"
    }
    return <span key={`box_${color}`} className={`colorBox ${color}`} onClick={labelClickHandler.bind(this)}><p>{active}</p></span>
}

function labelClickHandler(e){
    const color = e.currentTarget.className.substr(9);
    this.props.dispatch(Actions.changeLabel(color, this.props.listId, this.props.itemId));
}

export default AddLabelBox;