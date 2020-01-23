import React, { Component } from 'react';
import TimeBoxEditor from './TimeBoxEditor';
import uuid from 'uuid';
import './TimeBoxCreator.scss';

class TimeBoxCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            totalTimeInMinutes: null
        }
        this.titleInput = React.createRef();
        this.timeInput = React.createRef();
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

    handleSubmit = e => {
        e.preventDefault(); 
        this.props.onCreate({id: uuid.v4(), title: this.titleInput.current.value, totalTimeInMinutes: this.timeInput.current.value});
        this.setState({
            title: null,
            totalTimeInMinutes: null
        })    
        console.log('refs:', this.titleInput.current.value, this.timeInput.current.value)
        this.titleInput.current.value = "";
        this.timeInput.current.value = "";
    }

    render() {
        const { onCreate, isEditable, handleTitleChange, handleTotalTimeInMinutes } = this.props;
        const {title, totalTimeInMinutes} = this.state;

        return (
            <div className="TimeBoxCreator">
                <h1>TimeBoxCreator</h1>
                <TimeBoxEditor onCreate={onCreate} isEditable={isEditable} handleTitleChange={handleTitleChange} handleTotalTimeInMinutes={handleTotalTimeInMinutes} add={false} changes={true} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Co robisz?<input name="title" defaultValue={title} onChange={this.handleTitleChange} type="text" ref={this.titleInput} /></label>
                    <br />
                    <label htmlFor="num">Ile minut?<input name="num" defaultValue={totalTimeInMinutes} type="number" onChange={this.handleTotalTimeInMinutes} ref={this.timeInput} /></label>
                    <br />
                    <button type="submit" >Dodaj</button>
                </form>
    
            </div>
        )
    }
}

export default TimeBoxCreator;

