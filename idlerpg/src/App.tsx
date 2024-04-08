import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {CounterProvider} from "./Counter";
import Nested from "./Nested";

const App: Component = () => {
  return (
      <CounterProvider>
        <Nested/>
      </CounterProvider>
  );
};

export default App;
