import React from 'react';
import './App.css';
import {Counter, AltCounter} from './components/Counter';
import {Tasks} from './components/Tasks';

function App() {
  return (
    <div className="App">

      <section className={'counters'}>
        <Counter />
        <AltCounter />
      </section>
      <hr />
      <section className={'tasks'}>
        <Tasks />
      </section>
    </div>
  );
}

export default App;
