import React, {Component} from 'react';
import {connect} from 'react-redux';

import MessagePanel from './MessagePanel';
import Board from './Board';

class App extends Component {

    render(){

        return (
            <section>
                <MessagePanel message={this.props.message} />
                <Board board={this.props.currentBoard} />
                Content holder
            </section>
        )
    }

}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(App);