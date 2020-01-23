import React, { Component } from 'react';
import './TimeBox.scss';

export class TimeBox extends Component {
    render() {
        
        const { title, totalTimeInMinutes, handleEdit, handleDelete, id } = this.props;

        return (
            <div className="time-box">
                <p>ID: {id}</p>
                <p>Title: {title}</p>
                <p>Time: {totalTimeInMinutes}</p>
                <button onClick={handleEdit}>Edytuj</button>
                <button onClick={handleDelete}>Usuń</button>
            </div>
        )
    }
}

export default TimeBox;
