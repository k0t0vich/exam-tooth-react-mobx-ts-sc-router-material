import React, { Component, KeyboardEvent } from "react";
import './App.css';
import RecordsTable from './components/table/RecordsTable';
import DataLoader from "./services/DataLoader"
import RecordData from "./data/RecordData";
import Store from "./data/Store";
import {observer} from "mobx-react";
import {action} from "mobx";

@observer
export default class App extends Component {
  store:Store = new Store();

  componentDidMount(){
    this.changeSearchString = this.changeSearchString.bind(this);

    DataLoader.load<RecordData[]>('testData.json')
      .then((data:RecordData[]) => this.initRecords(data));  
  }

  @action initRecords(data:RecordData[]) {
    this.store.records = data;
    console.log(data);
    //this.forceUpdate();
  }
  
  @action changeSearchString(event:KeyboardEvent<HTMLInputElement>){
    if (event && event.key === "Enter") {
      console.log("changeSearchString ",(event.target as HTMLInputElement).value," key:", event.key);
      this.store.searchString = (event.target as HTMLInputElement).value;
      //this.forceUpdate();
    }
  }

  render(){
    return (
      <div className="App">          
        <header className="App-header">
           <p>exam-tooth-react-mobx-ts-sc-router-material</p>
           <RecordsTable 
              records={this.store.filteredRecords}
              changeSearchString={this.changeSearchString}
              searchString={this.store.searchString}
           />
        </header>
      </div>
    );
  }
}

