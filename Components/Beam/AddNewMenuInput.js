import React, {Component} from 'react';

class AddNewMenuInput extends Component{

    render(){
        return (
            <div id="addMenuInputBox" className="hidden">
                <span className="return"></span>
                <input type="text" id="add_title" placeholder="Add a title..."/>
                <input type="submit" id="add_element" value="Add" onClick={this.props.trigger} />
                <input type="submit" id="cancel_add_element" value="Cancel" />
            </div>
        )
    }

}

export default AddNewMenuInput;