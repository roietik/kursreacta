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
    this.props.confirmChanges(
      this.titleInput.current.value,
      this.timeInput.current.value,
      this.props.index
    );
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
            Title: {title}
            <input
              disabled={!isEditorEditable}
              name="title"
              defaultValue={title}
              ref={this.titleInput}
              type="text"
              placeholder="New Title"
              required
            />
          </label>
          <label htmlFor="num">
            Time: {totalTimeInMinutes}
            <input
              disabled={!isEditorEditable}
              name="num"
              defaultValue={totalTimeInMinutes}
              ref={this.timeInput}
              type="number"
              placeholder="New Time"
              required
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
