import React from 'react';
import './App.scss';
import TimeBoxEditor from './components/TimeBoxEditor';
import TimeBox from './components/TimeBox';

function App() {
  return (
    <div className="App">
      <h1 className="title">React</h1>
      <TimeBoxEditor/>
      <TimeBox/>
    </div>
  );
}

export default App;
