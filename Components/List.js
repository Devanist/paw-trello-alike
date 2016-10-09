import React, {Component} from 'react';
import Board from './Board';
import ListItem from './ListItem';

class List extends Component{

    renderListItems(){
        console.log(this.props.list);
        return this.props.list.listItems.map( (listItem) => {
            return <ListItem key={listItem.id} listItem={listItem} />
        });
    }

    render(){
        const listItems = this.renderListItems();

        return (
            <section className="list" id={`list_${this.props.list.id}`}>
                <h3>{this.props.list.title}</h3>
                <section>{listItems}</section>
            </section>
        )

    }
}

export default List;