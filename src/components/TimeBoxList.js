import React, { Component } from 'react';
import TimeBoxEditor from './TimeBoxEditor';
import TimeBoxCreator from './TimeBoxCreator';
import CurrentTimeBox from './CurrentTimeBox';
import TimeBox from './TimeBox';
import '../sass/TimeBoxList.scss';

class TimeBoxList extends Component {
    state = {
        timeboxes: [
            { id: "box-0", title: "TimeBox03524631", totalTimeInMinutes: 25 },
            { id: "box-1", title: "TimeBox02567", totalTimeInMinutes: 5 },
            { id: "box-2", title: "TimeBox09563", totalTimeInMinutes: 55 },
            { id: "box-3", title: "TimeBox035255", totalTimeInMinutes: 44 },
            { id: "box-4", title: "TimeBox02567", totalTimeInMinutes: 5 },
            { id: "box-5", title: "TimeBox0963", totalTimeInMinutes: 2 },
            { id: "box-6", title: "TimeBox03566", totalTimeInMinutes: 9 },
            { id: "box-7", title: "TimeBox02567", totalTimeInMinutes: 5 },
            { id: "box-8", title: "TimeBox09563", totalTimeInMinutes: 3 }
        ],
        add: { title: "", totalTimeInMinutes: "" },
        editor: {index: "", id: "", title: "", totalTimeInMinutes: "" },
        current: {index: "", id: "", title: "", totalTimeInMinutes: 0 },
        isEditorEditable: false,
        isCurrentEditable: false,
        elapsedTimeInSeconds: 0,
        pausesCount: 0,
        isRunning: false,
        isPaused: false,
        isTimerStart: false,
    }

    onCreate = timebox => {

        this.setState(prevState => {
            const timeboxes = [...prevState.timeboxes, timebox];
            return { timeboxes, title: "", totalTimeInMinutes: "", };
        })
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

    handleEdit = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) => index === indexToUpdate ? updatedTimebox : timebox)
            const timeboxToEdit = prevState.timeboxes[indexToUpdate]

            return { timeboxes, editor:{index: indexToUpdate, ...timeboxToEdit}, isEditorEditable: true };
        })
    }

    handleDelete = indexToRemove => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove)
            return { timeboxes };
        })
    }

    confirmChanges = (indexToUpdate, titleToUpdate, totalTimeInMinutesToUpdate) => {

        this.setState(prevState => {

            const timeboxes = prevState.timeboxes.map(
                (timebox, index) => (index === indexToUpdate) ? {
                    id: timebox.id,
                    title: (titleToUpdate ===  "") ? timebox.title : titleToUpdate,
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

            return {current:{index: indexToUpdate, ...timebox[indexToUpdate]}, isCurrentEditable: true};
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
            } = this.state;

        return (
            <div className="TimeBoxList container">
                <div className="content">
                    {
                        this.state.timeboxes.map((timebox, i) => {

                            const basicProps = {
                                id: timebox.id,
                                index: i,
                                title: timebox.title,
                                totalTimeInMinutes: timebox.totalTimeInMinutes,
                                handleDelete: () => this.handleDelete(i),
                                handleEdit: () => this.handleEdit(
                                    i, {
                                    ...timebox,
                                    id: timebox.id,
                                    title: timebox.title,
                                    totalTimeInMinutes: timebox.totalTimeInMinutes
                                }),
                                handleActivTimer: () => this.handleActivTimer(i)
                            }

                            return (
                                <TimeBox key={timebox.id} basicProps={basicProps}/>
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
                        onCreate={this.onCreate}

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

export default TimeBoxList;
