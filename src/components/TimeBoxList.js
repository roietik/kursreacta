import React, { Component } from 'react';
import TimeBoxCreator from './TimeBoxCreator';
import TimeBox from './TimeBox';
import uuid from 'uuid';
import './sass/TimeBoxList.scss';

class TimeBoxList extends Component {
    state = {
        timeboxes: [
            { id: "00ba380b-9d5b-45ac-89d7-8b4960c1532f", title: "TimeBox03524631", totalTimeInMinutes: 25 },
            { id: "11ba380b-9d5b-45ac-89d7-8b4960c1532f", title: "TimeBox02567", totalTimeInMinutes: 5 },
            { id: "22ba380b-9d5b-45ac-89d7-8b4960c1532f", title: "TimeBox09563", totalTimeInMinutes: 55 }
        ],
        title: null,
        totalTimeInMinutes: null,

    }

    handleEdit = (indexToUpdate, updatedTimebox) => {
        console.log('indexToUpdate: ',indexToUpdate);
        console.log('updatedTimebox: ',updatedTimebox);
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map( (timebox, index) => index === indexToUpdate ? updatedTimebox : timebox)
            return {timeboxes};
        })
    }

    handleDelete = indexToRemove => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove)
            return {timeboxes};
        })
    }

    addTimeBox = timebox => {
        this.setState(prevState => {
            const timeboxes = [...prevState.timeboxes, timebox];
            return {timeboxes};
        })
    }

    onCreate = item => {
        this.addTimeBox(this.state.title === null ? item : {id: uuid.v4(), title: this.state.title, totalTimeInMinutes: this.state.totalTimeInMinutes} );
        this.setState({
            title: null,
            totalTimeInMinutes: null,
        })
    }

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
        return (
            <>
                <TimeBoxCreator onCreate={this.onCreate} isEditable={true}  handleTitleChange={this.handleTitleChange} handleTotalTimeInMinutes={this.handleTotalTimeInMinutes}  />
                {
                    this.state.timeboxes.map((timebox, i) => {
                       return  <TimeBox id={timebox.id} key={timebox.id} title={timebox.title} totalTimeInMinutes={timebox.totalTimeInMinutes} handleDelete={() => this.handleDelete(i)} handleEdit={() => this.handleEdit(i, {...timebox, title: "Updated TimeBox"})} />
                    })
                }
            </>
        )
    }
}

export default TimeBoxList;