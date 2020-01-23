import React, { Component } from 'react';
import TimeBoxEditor from './TimeBoxEditor';
import CurrentTimeBox from './CurrentTimeBox';

export class EditableTimeBox extends Component {

    state = {
        pausesCount: 0,
        isRunning: false,
        isPaused: false,
        elapsedTimeInSeconds: 0,
        title: "Add title",
        totalTimeInMinutes: 15,
        isEditable: true

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

    onConfirm = () => {
        this.setState({
            isEditable: false
        })
    }
    onEdit = () => {
        this.setState({
            isEditable: true
        })
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

    handleTitleChange = e => {
        this.setState({
            title: e.target.value
        })
        console.log(e.target.value);
    }

    handleTotalTimeInMinutes = e => {
        this.setState({
            totalTimeInMinutes: e.target.value
        })
        console.log(e.target.value);
    }

    render() {
        const { pausesCount, isPaused, isRunning, elapsedTimeInSeconds, title, totalTimeInMinutes, isEditable } = this.state;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const houersLeft = Math.floor(timeLeftInSeconds / (60 ** 2))
        const minutesLeft = Math.floor((timeLeftInSeconds - (houersLeft * (60 ** 2))) / 60);
        const secondsLeft = Math.floor((timeLeftInSeconds - (houersLeft * (60 ** 2))) % 60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;

        console.log(`%c ${houersLeft}:${minutesLeft}:${secondsLeft}`, `color: orangered`);
        return (
            <>
                <TimeBoxEditor title={title} totalTimeInMinutes={totalTimeInMinutes} handleTitleChange={this.handleTitleChange} handleTotalTimeInMinutes={this.handleTotalTimeInMinutes} onConfirm={this.onConfirm} isEditable={isEditable} add={true} change={false}/>
                <CurrentTimeBox totalTimeInMinutes={totalTimeInMinutes} title={title} houersLeft={houersLeft} minutesLeft={minutesLeft} secondsLeft={secondsLeft} pausesCount={pausesCount} isPaused={isPaused} isRunning={isRunning} progressInPercent={progressInPercent} handleStart={this.handleStart} handleStop={this.handleStop} togglePause={this.togglePause} onEdit={this.onEdit} isEditable={isEditable} />
            </>
        )
    }
}

export default EditableTimeBox;
