import React, {Component} from 'react';
import "../sass/TimeBoxEditor.scss";

class TimeBoxEditor extends Component {

    render() {
        const {title, totalTimeInMinutes, handleTitleChange, handleTotalTimeInMinutesChange, confirmChanges, isEditorEditable } = this.props;
        return (
            <div className={`TimeBoxEditor ${!isEditorEditable ? "inactive" : ""}`}>
                <h1 className="title">TimeBoxEditor</h1>
                <label htmlFor="title">Co robisz?{title}<input disabled={!isEditorEditable} name="title" value={title} onChange={handleTitleChange} type="text" /></label>
                <label htmlFor="num">Ile minut? {totalTimeInMinutes}<input disabled={!isEditorEditable} name="num" value={totalTimeInMinutes} onChange={handleTotalTimeInMinutesChange} type="number" /></label>
                <button disabled={!isEditorEditable} onClick={confirmChanges}>Zapisz</button>
            </div>
        )
    }
}

export default TimeBoxEditor;
