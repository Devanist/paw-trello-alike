import React, {Component} from 'react';
import Languages from '../../Languages/Language';
import {Actions} from '../../Actions/Actions';

class LanguageSelector extends Component{

    constructor(){
        super();

        this.state = {
            displayBox: false
        };
    }

    render(){

        let box = "";
        if(this.state.displayBox){
            box = (
                <section id="langSelectBox">
                    <ul>
                        {Object.keys(Languages).map(langToListItem.bind(this))}
                    </ul>
                </section>
            );
        }

        return(
            <section id="LanguageSelector" onClick={() => {
                this.setState({
                    displayBox: !this.state.displayBox
                })
            }}>
                {this.props.lang.toUpperCase()}
                {box}
            </section>
        );

    }

}

function langToListItem(item){
    return <li key={item} id={item} onClick={onLangClick.bind(this)}>{item.toUpperCase()}</li>
}

function onLangClick(e){
    this.props.dispatch(Actions.changeLanguage(e.target.id));
    this.setState({
        displayBox: false
    })
}

export default LanguageSelector;