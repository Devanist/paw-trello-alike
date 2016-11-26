import React, {Component} from 'react';
import Language from '../../Languages/Language';

class AddNewMenuInput extends Component{

    render(){
        return (
            <div id="addMenuInputBox" className="hidden">
                <span className="return"></span>
                <input type="text" id="add_title" placeholder={Language[this.props.lang].AddMenuInput.placeholder}/>
                <input type="submit" id="add_element" value={Language[this.props.lang].AddMenuInput.add_element} onClick={this.props.trigger} />
                <input type="submit" id="cancel_add_element" value={Language[this.props.lang].AddMenuInput.cancel_add_element} />
            </div>
        )
    }

}

export default AddNewMenuInput;