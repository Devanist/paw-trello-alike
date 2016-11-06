import React, {Component} from 'react';

class AddLabelBox extends Component{

    render(){

        return(
            <section id="AddLabelBox">
                <span id="closeAddLabel" className="closePanel" onClick={this.props.onClose}></span>
                <h2>Labels</h2>
                <hr/>
                <span className="colorBox green"></span>
                <span className="colorBox yellow"></span>
                <span className="colorBox orange"></span>
                <span className="colorBox red"></span>
                <span className="colorBox purple"></span>
                <span className="colorBox blue"></span>
            </section>
        );

    }

}

export default AddLabelBox;