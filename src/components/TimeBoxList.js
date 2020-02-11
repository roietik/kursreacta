import React, { Component } from 'react';
import TimeBoxApi from "../api/FetchTimeBoxesApi";
import AuthenticationContext from '../contexts/AuthenticationContext';


import TimeBoxEditor from './TimeBoxEditor';
import TimeBoxCreator from './TimeBoxCreator';
import CurrentTimeBox from './CurrentTimeBox';
import TimeBox from './TimeBox';

import '../sass/TimeBoxList.scss';

class TimeBoxList extends Component{
    state = {
        timeboxes: [],
        isLoading: true,
        isError: null,
        add: { title: "", totalTimeInMinutes: "" },
        editor: { index: "", id: "", title: "", totalTimeInMinutes: "" },
        current: { index: "", id: "", title: "", totalTimeInMinutes: 0 },
        isEditorEditable: false,
        isCurrentEditable: false,
        elapsedTimeInSeconds: 0,
        pausesCount: 0,
        isRunning: false,
        isPaused: false,
        isTimerStart: false,
    }

    componentDidMount() {

        TimeBoxApi.getAllTimeBoxes(this.context.accessToken)
            .then(timeboxes => this.setState({ timeboxes }))
            .catch(isError => this.setState({ isError }))
            .finally(isLoading => this.setState({ isLoading }))
    }

    addTimeBox = timebox => {
        TimeBoxApi.addTimeBox(timebox, this.context.accessToken)
            .then(
                addedTimeBox => this.setState(prevState => {
                    const timeboxes = [...prevState.timeboxes, addedTimeBox];
                    return { timeboxes };
                })
            )
            .catch(err => console.log(err))
            .finally(() => this.setState({ add: { title: "", totalTimeInMinutes: "" } }))
    }

    editTimeBox = (indexToUpdate, timeBoxToUpdate) => {
        TimeBoxApi.replaceTimeBox(timeBoxToUpdate, this.context.accessToken)
            .then(
                updatedTimebox => this.setState(prevState => {
                    const timeboxes = prevState.timeboxes.map((timebox, index) => index === indexToUpdate ? updatedTimebox : timebox)
                    const timeboxToEdit = prevState.timeboxes[indexToUpdate]

                    return { timeboxes, editor: { index: indexToUpdate, ...timeboxToEdit }, isEditorEditable: true };
                })
            )
    }

    removeTimeBox = indexToRemove => {
        TimeBoxApi.removeTimeBox(this.state.timeboxes[indexToRemove], this.context.accessToken).then(
            () => this.setState(prevState => {
                const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove)
                return { timeboxes };
            })
        )
    }

    handleTitleAdd = e => {
        this.setState({
            add: {
                title: e.target.value,
                totalTimeInMinutes: this.state.add.totalTimeInMinutes
            }
        })
    }

    handleTotalTimeInMinutesAdd = e => {
        this.setState({
            add: {
                title: this.state.add.title,
                totalTimeInMinutes: e.target.value
            }
        })
    }

    handleTitleChange = e => {
        this.setState({
            editor: {
                index: this.state.editor.index,
                id: this.state.editor.id,
                title: e.target.value,
                totalTimeInMinutes: this.state.editor.totalTimeInMinutes
            }
        })
        return e.target.value;
    }

    handleTotalTimeInMinutesChange = e => {
        this.setState({
            editor: {
                index: this.state.editor.index,
                id: this.state.editor.id,
                title: this.state.editor.title,
                totalTimeInMinutes: e.target.value
            }
        })
        return e.target.value;
    }

    startTimer = () => {
        this.intervalId = window.setInterval(() => {
            this.setState(
                (prevState) => ({
                    elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1
                })
            )
        }, 100);
    }

    stopTimer = () => {
        window.clearInterval(this.intervalId);
    }

    confirmChanges = (indexToUpdate, titleToUpdate, totalTimeInMinutesToUpdate) => {

        this.setState(prevState => {

            const timeboxes = prevState.timeboxes.map(
                (timebox, index) => (index === indexToUpdate) ? {
                    id: timebox.id,
                    title: (titleToUpdate === "") ? timebox.title : titleToUpdate,
                    totalTimeInMinutes: (titleToUpdate === "") ? timebox.totalTimeInMinutes : totalTimeInMinutesToUpdate
                } : timebox
            )

            return { timeboxes, isEdit: false, isEditable: false, editor: { index: "", id: "", title: "", totalTimeInMinutes: "" } };
        })
        this.disableEditor();
    }

    disableEditor = () => {
        this.setState({
            isEditorEditable: false,
            editor: { index: "", id: "", title: "", totalTimeInMinutes: "" }
        })
    }

    onEdit = () => this.setState({ isEditable: true })

    handleStart = (indexToUpdate) => {
        this.setState(prevState => {
            const isTimerStart = prevState.timeboxes.map((arg, index) => index === indexToUpdate ? true : false)

            return { isTimerStart: isTimerStart, isRunning: true };
        })
        this.startTimer(indexToUpdate);
    }

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

    handleActivTimer = (indexToUpdate) => {

        this.setState(prevState => {

            const timebox = prevState.timeboxes.map(
                (timebox, index) => (index === indexToUpdate) && {
                    id: timebox.id,
                    title: timebox.title,
                    totalTimeInMinutes: timebox.totalTimeInMinutes
                }
            )

            return { current: { index: indexToUpdate, ...timebox[indexToUpdate] }, isCurrentEditable: true };
        })
    }

    render() {
        const { pausesCount,
            isPaused,
            isRunning,
            add: { titleFromAdd, totalTimeInMinutesFromAdd },
            current: {
                index: indexFromCurrent,
                id: idFromCurrent,
                title: titleFromCurrent,
                totalTimeInMinutes: totalTimeInMinutesFromCurrent,
            },
            editor: {
                index: indexFromEditor,
                title: titleFromEditor,
                totalTimeInMinutes: totalTimeInMinutesFromEditor,
            },
            elapsedTimeInSeconds,
            isEditorEditable,
            isLoading,
            isError
        } = this.state;

        return (
            <div className="TimeBoxList container">
                <div className="content" >
                    {
                        this.state.timeboxes.map((timebox, i) => {

                            const timeBoxProps = {
                                id: timebox.id,
                                index: i,
                                title: timebox.title,
                                totalTimeInMinutes: timebox.totalTimeInMinutes,
                                removeTimeBox: () => this.removeTimeBox(i),
                                editTimeBox: () => this.editTimeBox(
                                    i, {
                                    ...timebox,
                                    id: timebox.id,
                                    title: timebox.title,
                                    totalTimeInMinutes: timebox.totalTimeInMinutes
                                }),
                                handleActivTimer: () => this.handleActivTimer(i)
                            }

                            return (
                                <React.Fragment key={timebox.id}>
                                    {isLoading ? <h2 key={timebox.id}>Loading...</h2> : <TimeBox key={timebox.id} timeBoxProps={timeBoxProps} />}
                                    {isError && <h2>Nie udało się połączyć</h2>}
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                <div className="sidebar">
                    <TimeBoxCreator
                        title={titleFromAdd}
                        totalTimeInMinutes={totalTimeInMinutesFromAdd}
                        handleTitleAdd={this.handleTitleAdd}
                        handleTotalTimeInMinutesAdd={this.handleTotalTimeInMinutesAdd}
                        addTimeBox={this.addTimeBox}
                    />
                    <TimeBoxEditor
                        index={indexFromEditor}
                        title={titleFromEditor}
                        totalTimeInMinutes={totalTimeInMinutesFromEditor}
                        isEditorEditable={isEditorEditable}
                        handleTitleChange={this.handleTitleChange}
                        handleTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                        confirmChanges={() => { this.confirmChanges(indexFromEditor, titleFromEditor, totalTimeInMinutesFromEditor) }}
                    />
                    <CurrentTimeBox
                        id={idFromCurrent}
                        index={indexFromCurrent}
                        title={titleFromCurrent}
                        totalTimeInMinutes={totalTimeInMinutesFromCurrent}
                        isCurrentEditable={this.state.isCurrentEditable}
                        elapsedTimeInSeconds={elapsedTimeInSeconds}
                        pausesCount={pausesCount}
                        isPaused={isPaused}
                        isRunning={isRunning}
                        handleStart={() => this.handleStart(indexFromCurrent)}
                        handleStop={this.handleStop}
                        togglePause={this.togglePause}
                        onEdit={this.onEdit}
                    />
                </div>
            </div>
        )
    }
}
TimeBoxList.contextType = AuthenticationContext;

export default TimeBoxList;
