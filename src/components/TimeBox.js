import React, { Component } from 'react';
import TimeBoxEditor from './TimeBoxEditor';
import '../sass/TimeBox.scss';

export class TimeBox extends Component {
    render() {
        
        const { title, totalTimeInMinutes, handleEdit, handleDelete, id, isEdit, index } = this.props;

        return (
            <div className="time-box">
                <p>ID: {id}</p>
                <p>Title: {title}</p>
                <p>Time: {totalTimeInMinutes}</p>
                <button onClick={handleEdit}>Edytuj</button>
                <button onClick={handleDelete}>Usuń</button>
                <div className="separator"></div>
                <TimeBoxEditor isEditable={isEdit[index]}/>
                {console.log(`%c ${index}: ${isEdit[index]}`, `color: orangered`)}
            </div>
        )
    }
}

export default TimeBox;
