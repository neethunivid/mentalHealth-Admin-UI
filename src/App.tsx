import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/assets/css/base.css';
import '../src/assets/css/health.css';
import AppRouter from './AppRouter';

function App() {
  return (
    <div className="App" > 
    <AppRouter/>
    </div>
  );
}

export default App;
