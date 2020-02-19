import React, { Component } from "react";
import "../sass/TimeBoxCreator.scss";

class TimeBoxCreator extends Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.timeInput = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTimeBox({
      title: this.titleInput.current.value,
      totalTimeInMinutes: this.timeInput.current.value
    });
    this.titleInput.current.value = "";
    this.timeInput.current.value = "";
  };

  render() {
    const { title, totalTimeInMinutes } = this.props;

    return (
      <div className="TimeBoxCreator">
        <h1 className="title">TimeBoxCreator</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">
            Co robisz?
            <input
              name="title"
              defaultValue={title}
              type="text"
              ref={this.titleInput}
            />
          </label>
          <label htmlFor="num">
            Ile minut?
            <input
              name="num"
              defaultValue={totalTimeInMinutes}
              type="number"
              ref={this.timeInput}
            />
          </label>
          <button type="submit">Dodaj</button>
        </form>
      </div>
    );
  }
}

export default TimeBoxCreator;
