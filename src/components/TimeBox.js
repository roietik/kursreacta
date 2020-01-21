import React, { Component } from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import './TimeBox.scss';


export class TimeBox extends Component {

    state = {
        pausesCount: 0,
        isRunning: false,
        isPaused: false,
        elapsedTimeInSeconds: 0

    }

    stopTimer = () => {
        window.clearInterval(this.intervalId);
    }

    startTimer = () => {
        this.intervalId = window.setInterval(() => {
            this.setState(
                (prevState) => ({
                    elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1
                })
            )
        }, 100)
    }

    handleStart = () => {
        this.setState({
            isRunning: true
        })
        this.startTimer();
    };

    handleStop = () => {
        this.setState({
            pausesCount: 0,
            isRunning: false,
            isPaused: false,
            elapsedTimeInSeconds: 0
        })
        this.stopTimer();
    };

    togglePause = () => {
        this.setState((prevState) => {
            const isPaused = !prevState.isPaused;
            if (isPaused) {
                this.stopTimer();
            } else {
                this.startTimer();
            }
            return {
                isPaused,
                pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount

            }
        })
    };

    render() {
        const { pausesCount, isPaused, isRunning, elapsedTimeInSeconds } = this.state;
        const totalTimeInSeconds = 30 * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const houersLeft = Math.floor(timeLeftInSeconds / 3600)
        const minutesLeft = Math.floor((timeLeftInSeconds - (houersLeft * 3600)) / 60);
        const secondsLeft = Math.floor((timeLeftInSeconds - (houersLeft * 3600)) % 60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

        console.log(`%c ${houersLeft}:${minutesLeft}:${secondsLeft}`, `color: orangered`);

        return (
            <div className="TimeBox">
                <h1>TimeBox</h1>
                <Clock minutes={minutesLeft} seconds={secondsLeft} inactive={isPaused ? "inactive" : ""} />
                <ProgressBar inactive={isPaused ? "inactive" : ""} progress={progressInPercent} />
                <button onClick={this.handleStart} disabled={isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning} >Stop</button>
                <button onClick={this.togglePause} disabled={!isRunning}>{isPaused ? 'Wznów' : 'Pauzuj'}</button>
                <p>Liczba przerw: {pausesCount}</p>
            </div>
        )
    }
}

export default TimeBox;
