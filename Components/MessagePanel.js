import React, {Component} from 'react';

class MessagePanel extends Component{

    render(){
        return (
            <p>{this.props.message}</p>
        );
    }

}

export default MessagePanel;