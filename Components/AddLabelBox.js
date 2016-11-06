import React, {Component} from 'react';

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
    return <span className={`colorBox ${color}`}><p>{active}</p></span>
}

export default AddLabelBox;