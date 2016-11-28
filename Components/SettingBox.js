import React, {Component} from 'react';
import appConfig from '../config';
import {Actions, setMessage} from '../Actions/Actions';
import $ from 'jquery';

class SettingBox extends Component{

    render(){

        let display = "hidden"
        if(this.props.display){
            display = "";
        }

        return (
            <section id="SettingBox" className={display}>
                <section id="settings_container">
                    <section id="settings_main">
                    <ul>
                        <li data-goto="archivized_elements" onClick={goToSection}><p>Display archivized elements</p></li>
                    </ul>
                    </section>
                    <section id="archivized_elements">
                        <p data-goto="settings_main" onClick={goToSection}>Go back to settings</p>
                        <h2>Lists</h2>
                        <ul>
                            {this.props.boardArchive.lists.map(ArchivizedListToListElement)}
                        </ul>
                        <h2>Items</h2>
                        <ul>
                            {this.props.boardArchive.items.map(ArchivizedListItemToListElement)}
                        </ul>
                    </section>
                </section>
            </section>
        );

    }

}

function ArchivizedListToListElement(element){
    return <li id={`list_${element.id}`}><p>{element.title}</p></li>
}

function ArchivizedListItemToListElement(element){
    return <li id={`list_${element.listId}_${element.id}`}><p>{element.title}</p></li>
}

function goToSection(e){

    const id = e.currentTarget.getAttribute("data-goto");

    if(id === "settings_main"){
        $("#settings_container").animate(
            {
                left : 0
            }
        );
    }
    else{
        if(id === "archivized_elements"){
            
        }

        $("#settings_container section:not(:first-child)").addClass("hidden");
        $(`#${id}`).removeClass("hidden");

        $("#settings_container").animate(
            {
                left : -$("#settings_main").width()
            }
        );
    }
}

function fetchArchivizedElements(){
    $.get(`${appConfig.host}/archivize/${this.props.board.id}`).
        done( (data) => {
            if(data.error){
                setMessage.call(this, "fail", data.error);
            }
            this.props.dispatch(Actions.loadArchive(data));
        }).
        fail( (error) => {
            setMessage.call(this, "fail", "SERVER ERROR");
        });
}

export default SettingBox;