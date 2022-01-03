import React from 'react';
import './App.css';
import {Counter, AltCounter} from './components/Counter';
import {Tasks} from './components/Tasks';

function App() {
  return (
    <div className="App">

      <section className={'_counters'}>
        <h3>COUNTERS</h3>
        <Counter />
        <AltCounter />
      </section>
      <hr />
      <section className={'_tasks'}>
        <Tasks />
      </section>
    </div>
  );
}

export default App;
