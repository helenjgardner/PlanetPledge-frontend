import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Pledge from './components/Pledge.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <div className='app'>
      <Header />
      <div id="pledge-container">
        <Pledge />
        <Pledge />
        <Pledge />
        <Pledge />
        <Pledge />
      </div>
      <Footer />
    </div>
  );
}

export default App;
