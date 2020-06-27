import React, { Component } from 'react';

class TranscriptComponent extends Component {
    render() {
        const trans = this.props.trans;
        // const error = this.props.error;
        // console.log(trans);
        if (!trans) {
            return <p>data not found</p>;
        }
        return(
            <div>
                <div className="column">
                <div className="card">
                <h3>{trans.display_name}</h3>
                <p>Id: {trans.id}</p>
                <p>Source: {trans.source}</p>
                </div>
            </div>
            </div>
        )
    }
}

export default TranscriptComponent;