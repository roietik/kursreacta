import React, { Component } from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import '../sass/CurrentTimeBox.scss';

export class CurrentTimeBox extends Component {

    render() {
        const {
            index,
            title,
            totalTimeInMinutes,
            isCurrentEditable,
            elapsedTimeInSeconds,
            isRunning,
            isPaused,
            pausesCount,
            handleStart,
            handleStop,
            togglePause,
            onEdit
        } = this.props
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const hoursLeft = Math.floor(timeLeftInSeconds / (60 ** 2))
        const minutesLeft = Math.floor((timeLeftInSeconds - (hoursLeft * (60 ** 2))) / 60);
        const secondsLeft = Math.floor((timeLeftInSeconds - (hoursLeft * (60 ** 2))) % 60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

        const hoursLeftFormat = hoursLeft.toString().length === 1 ? "0"+hoursLeft.toString() : hoursLeft.toString();
        const minutesLeftFormat = minutesLeft.toString().length === 1 ? "0"+minutesLeft.toString() : minutesLeft.toString();
        const secondsLeftFormat = secondsLeft.toString().length === 1 ? "0"+secondsLeft.toString() : secondsLeft.toString();

        return (
            <div className={`CurrentTimeBox ${!isCurrentEditable ? "inactive" : ""}`}>
                <h1 className="title">CurrentTimeBox</h1>
                <p>Title: {title}</p>
                <p>Index: {index}</p>
                <Clock hours={hoursLeftFormat} minutes={minutesLeftFormat} seconds={secondsLeftFormat} inactive={isPaused ? "inactive" : ""} />
                <ProgressBar inactive={isPaused ? "inactive" : ""} progress={progressInPercent} />
                <button onClick={handleStart} disabled={isRunning}>Start</button>
                <button onClick={handleStop} disabled={!isRunning} >Stop</button>
                <button onClick={togglePause} disabled={!isRunning}>{isPaused ? 'Wznów' : 'Pauzuj'}</button>
                <button onClick={onEdit} disabled={isRunning}>Edit</button>
                <p>Liczba przerw: {pausesCount}</p>
            </div>
        )
    }
}

export default CurrentTimeBox;