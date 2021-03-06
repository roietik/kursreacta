import React, { Component } from 'react';
import '../sass/TimeBox.scss';

export class TimeBox extends Component {

    render() {

        const { 
            timeBoxProps: { id, index, title, totalTimeInMinutes, removeTimeBox, editTimeBox, handleActivTimer }
        } = this.props;

        return (
            <div className="TimeBox">

                <h1>TimeBox</h1>
                <div className="status">
                    <p>ID: {id}</p>
                    <p>Index: {index}</p>
                    <p>Title: {title}</p>
                    <p>Time: {totalTimeInMinutes}</p>
                </div>
                <div className="actions">
                    <button onClick={handleActivTimer}>Dalej</button>
                    <button onClick={editTimeBox}>Edytuj</button>
                    <button onClick={removeTimeBox}>Usuń</button>
                </div>

                <div className="separator"></div>
            </div>
        )
    }
}

export default TimeBox;
