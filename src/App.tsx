import React, { Component } from "react";
import './App.css';
import AccauntsTable from './components/table/AccauntsTable';

export default class App extends Component {

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p>
          exam-tooth-react-mobx-ts-sc-router-material
          </p>
          <AccauntsTable/>
        </header>
      </div>
    );
  }
}

