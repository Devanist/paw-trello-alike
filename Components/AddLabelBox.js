import React, {Component} from 'react';

class AddLabelBox extends Component{

    render(){

        return(
            <section id="AddLabelBox">
                <span id="closeAddLabel" className="closePanel" onClick={this.props.onClose}></span>
                <h2>Labels</h2>
                <span className="colorBox green"><p>&#10003;</p></span>
                <span className="colorBox yellow"><p>&#10003;</p></span>
                <span className="colorBox orange"><p></p></span>
                <span className="colorBox red"><p></p></span>
                <span className="colorBox purple"><p></p></span>
                <span className="colorBox blue"><p></p></span>
            </section>
        );

    }

}

export default AddLabelBox;