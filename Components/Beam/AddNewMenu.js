import React, {Component} from 'react';

class AddNewMenu extends Component{

    render(){
        return (
            <div id="addMenu" className="hidden">
                <h3>Add a...</h3>
                <ul>
                    <li>
                        <a id="addBoardLink" className="addNewLink" href="#">
                            <section>
                            <h4>new board</h4>
                            <img src="../../Assets/boards.png"/>
                            </section>
                        </a>
                        <a id="createTeamLink" className="createNewTeamLink" href="#">
                            <section>
                            <h4>new team</h4>
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