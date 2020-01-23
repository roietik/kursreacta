import React from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import './sass/CurrentTimeBox.scss';

const CurrentTimeBox = ({ title, houersLeft, minutesLeft, secondsLeft, isRunning, isPaused, progressInPercent, pausesCount, handleStart, handleStop, togglePause, isEditable, onEdit }) => {
    return(
        <div className={`CurrentTimeBox ${isEditable ? "inactive" : ""}`}>
        <h1>{title}</h1>
        <Clock houers={houersLeft} minutes={minutesLeft} seconds={secondsLeft} inactive={isPaused ? "inactive" : ""} />
        <ProgressBar inactive={isPaused ? "inactive" : ""} progress={progressInPercent} />
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning} >Stop</button>
        <button onClick={togglePause} disabled={!isRunning}>{isPaused ? 'Wznów' : 'Pauzuj'}</button>
        <button onClick={onEdit} disabled={isRunning}>Edit</button>
        <p>Liczba przerw: {pausesCount}</p>
    </div>
    )
  }

  export default CurrentTimeBox;

