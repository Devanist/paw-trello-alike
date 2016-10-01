import React, {Component} from 'react';
import {connect} from 'react-redux';

import MessagePanel from './MessagePanel';

class App extends Component {

    render(){
        return (
            <section>
                <MessagePanel message={this.props.message} />
                Content holder
            </section>
        )
    }

}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(App);