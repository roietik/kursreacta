import React, { Component } from "react";
import "../sass/TimeBoxEditor.scss";

class TimeBoxEditor extends Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.timeInput = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.confirmChanges({
      title: this.titleInput.current.value,
      totalTimeInMinutes: this.timeInput.current.value,
      index: this.props.index
    });
    this.titleInput.current.value = "";
    this.timeInput.current.value = "";
  };
  render() {
    const { title, totalTimeInMinutes, isEditorEditable } = this.props;
    return (
      <div className={`TimeBoxEditor ${!isEditorEditable ? "inactive" : ""}`}>
        <h1 className="title">TimeBoxEditor</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">
            Co robisz?{title}
            <input
              disabled={!isEditorEditable}
              name="title"
              defaultValue={title}
              ref={this.titleInput}
              type="text"
            />
          </label>
          <label htmlFor="num">
            Ile minut? {totalTimeInMinutes}
            <input
              disabled={!isEditorEditable}
              name="num"
              defaultValue={totalTimeInMinutes}
              ref={this.timeInput}
              type="number"
            />
          </label>
          <button disabled={!isEditorEditable} type="submit">
            Zapisz
          </button>
        </form>
      </div>
    );
  }
}

export default TimeBoxEditor;
