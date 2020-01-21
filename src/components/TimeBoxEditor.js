import React, { Component } from 'react';
import "./TimeBoxEditor.scss";

export class TimeBoxEditor extends Component {
    render() {
        return (
            <div className="TimeBoxEditor">
                <label htmlFor="title">Co robisz?<input name="title" placeholder="Uczę się skrótów klawiszowych" type="text" /></label>
                <label htmlFor="num">Ile minut?<input name="num" disabled value="25" type="number" /></label>
                <button>Zacznij</button>
            </div>
        )
    }
}

export default TimeBoxEditor;
