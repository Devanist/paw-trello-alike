import React, {Component} from 'react';
import Language from '../Languages/Language';

class Comment extends Component{

    render(){

        let editDate = "";
        if(this.props.content.editDate){
            editDate = <h4>{Language[this.props.lang].Comment.h4}{this.props.content.editDate}</h4>;
        }

        return (
            <li className="Comment">
                <h3>{this.props.content.author}</h3>
                <p>{this.props.content.text}</p>
                <h4>{this.props.content.addDate}</h4>
                {editDate}
            </li>
        );

    }

}

export default Comment;