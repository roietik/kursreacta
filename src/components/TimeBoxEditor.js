import React, {Component} from 'react';
import "./sass/TimeBoxEditor.scss";

class TimeBoxEditor extends Component {
    render() {
        const {title, totalTimeInMinutes, handleTitleChange, handleTotalTimeInMinutes, onConfirm, isEditable, onCreate, changes, add} = this.props;
        return (
            <div className={`TimeBoxEditor ${!isEditable ? "inactive" : ""}`}>
                <label disabled={!isEditable} htmlFor="title">Co robisz?<input name="title" defaultValue={title} onChange={handleTitleChange} type="text" /></label>
                <br/>
                <label disabled={!isEditable} htmlFor="num">Ile minut?<input name="num" defaultValue={totalTimeInMinutes} onChange={handleTotalTimeInMinutes} type="number" /></label>
                <br/>
                <button className={changes ? 'changesNone' : "" } disabled={!isEditable} onClick={onConfirm}>Zatwierdź zmiany</button>
                <button className={add ? 'addNone' : ""}  onClick={onCreate} >Dodaj</button>
            </div>
        )
    }
}

export default TimeBoxEditor;
