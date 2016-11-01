import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from '../Actions/Actions';

import Beam from './Beam';
import MessagePanel from './MessagePanel';
import BoardsSidePanel from './BoardsSidePanel';

class App extends Component {

    render(){

        let sidePanel = "";

        if(localStorage.getItem('user') !== null){
            this.props.dispatch(Actions.login( localStorage.getItem('user') ));
        }

        if(this.props.user !== null){
            sidePanel = <BoardsSidePanel boards={this.props.user.boardsList} searchResults={this.props.searchBoardsResults} dispatch={this.props.dispatch}/>;
        }

        return (
            <section>
                <Beam dispatch={this.props.dispatch} user={this.props.user} />
                <MessagePanel data={this.props.messagePanel} />
                <section id="contentHolder">
                    {sidePanel}
                    <section id="view">
                        {this.props.children}
                    </section>
                </section>
            </section>
        )
    }

}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(App);