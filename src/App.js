import React from 'react';
import './App.scss';
import TimeBoxList from './components/TimeBoxList';


function App() {
  return (
    <div className="App">
      <h1 className="title">Timer</h1>
      <TimeBoxList key={'tbl'}/>
    </div>
  );
}

export default App;
