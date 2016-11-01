import React, {Component} from 'react';

class BeamAside extends Component{

    render(){
        return  (
            <aside>
                <p>{this.props.username}</p>
                <span onClick={this.props.trigger}>
                    <img id="beam_profile_pic" src={this.props.userPic} />
                </span>
            </aside>
        )
    }

}

export default BeamAside;