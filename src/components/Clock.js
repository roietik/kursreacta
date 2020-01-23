import React, { Component } from 'react';
import "./Clock.scss";

export class Clock extends Component {
    render() {

        const {houers, minutes, seconds, inactive} = this.props;
        return (
        <h2 className={`Clock ${inactive}`}>Pozostało: {`${houers}:${minutes}:${seconds}`}</h2>
        )
    }
}

export default Clock;
