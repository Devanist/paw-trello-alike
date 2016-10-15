import React, {Component} from 'react';

class MessagePanel extends Component{

    render(){
        return (
            <p id="MessagePanel">{this.props.message}</p>
        );
    }

}

export default MessagePanel;