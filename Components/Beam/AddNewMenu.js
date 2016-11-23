import React, {Component} from 'react';
import Language from '../../Languages/Language';

class AddNewMenu extends Component{

    render(){
        return (
            <div id="addMenu" className="hidden">
                <h3>{Language[this.props.lang].AddNewMenu.h3}</h3>
                <ul>
                    <li>
                        <a id="addBoardLink" className="addNewLink" href="#">
                            <section>
                            <h4>{Language[this.props.lang].AddNewMenu.newboard}</h4>
                            <img src="../../Assets/boards.png"/>
                            </section>
                        </a>
                        <a id="createTeamLink" className="createNewTeamLink" href="#">
                            <section>
                            <h4>{Language[this.props.lang].AddNewMenu.newteam}</h4>
                            <img src="../../Assets/team.png"/>
                            </section>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

}

export default AddNewMenu;