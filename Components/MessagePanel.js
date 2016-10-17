import React, {Component} from 'react';

class MessagePanel extends Component{

    render(){
        return (
            <p id="MessagePanel" className={this.props.data.result}>{this.props.data.message}</p>
        );
    }

}

export default MessagePanel;