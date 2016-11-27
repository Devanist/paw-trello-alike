import React, {Component} from 'react';
import $ from 'jquery';

class SettingBox extends Component{

    render(){

        return (
            <section id="SettingBox">
                <section id="settings_container">
                    <section id="settings_main">
                    <ul>
                        <li data-goto="archivized_elements" onClick={goToSection}><p>Display archivized elements</p></li>
                    </ul>
                    </section>
                    <section id="archivized_elements">
                        <p data-goto="settings_main" onClick={goToSection}>Go back to settings</p>
                        <h2>Lists</h2>
                        <ul></ul>
                        <h2>Items</h2>
                        <ul></ul>
                    </section>
                </section>
            </section>
        );

    }

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

        $("#settings_container section:not(:first-child)").addClass("hidden");
        $(`#${id}`).removeClass("hidden");

        $("#settings_container").animate(
            {
                left : -$("#settings_main").width()
            }
        );
    }
}

export default SettingBox;