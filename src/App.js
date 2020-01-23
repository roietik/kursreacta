import React from 'react';
import './App.scss';
import EditableTimeBox from './components/EditableTimeBox';
import TimeBoxList from './components/TimeBoxList';


function App() {
  return (
    <div className="App">
      <h1 className="title">Timer</h1>
      <EditableTimeBox/>
      <TimeBoxList/>
    </div>
  );
}

export default App;
