import React, {Component} from 'react';
import Board from '../Board';

import {connect} from 'react-redux';

class Home extends Component{
    render(){
        return (
            <Board board={this.props.currentBoard} dispatch={this.props.dispatch} />
        ) 
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Home);