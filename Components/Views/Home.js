import React, {Component} from 'react';
import Board from '../Board';
import Intro from './Intro';

import {connect} from 'react-redux';

class Home extends Component{

    render(){

        let body = <Board board={this.props.currentBoard} />;
        if(this.props.user === null){
            body = <Intro />
        }  

        return body
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Home);