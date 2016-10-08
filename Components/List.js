import React, {Component} from 'react';

class List extends Component{
    render(){

        return (
            <section className="list" id={`list_${this.props.list.id}`}>
                <h3>{this.props.list.title}</h3>
            </section>
        )

    }
}

export default List;