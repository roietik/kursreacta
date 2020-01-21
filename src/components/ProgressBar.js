import React, { Component } from 'react';
import "./ProgressBar.scss";

export class ProgressBar extends Component {
    render() {
        const {progress, inactive} = this.props;
        return (
            <div className={`ProgressBar ${inactive}`}>
                <div style={{width: `${progress}%`}}>
                </div>
            </div>
        )
    }
}

export default ProgressBar;
