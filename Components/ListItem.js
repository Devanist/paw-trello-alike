import React, {Component} from 'react';

class ListItem extends Component{
    render(){

        return (
            <section className="listItem" id={`listItem_${this.props.listItem.id}`}>
                <h3>{this.props.listItem.title}</h3>
            </section>
        )

    }
}

export default ListItem;