import React, { Component } from 'react';
import "../sass/Clock.scss";

export class Clock extends Component {

    render() {
        const {hours, minutes, seconds, inactive} = this.props;

        return (
    <h2 className={`Clock ${inactive}`}>Pozostało: {`${hours}:${minutes}:${seconds}`}</h2>
        )
    }
}

export default Clock;
