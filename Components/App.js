import React, {Component} from 'react';
import {connect} from 'react-redux';

import Beam from './Beam';
import MessagePanel from './MessagePanel';
import Board from './Board';

class App extends Component {

    render(){

        return (
            <section>
                <Beam user={this.props.user} />
                <MessagePanel message={this.props.message} />
                {this.props.children}
            </section>
        )
    }

}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(App);