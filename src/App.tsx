import React, { Component, KeyboardEvent } from "react";
import { Observer } from "mobx-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Store from "./data/Store";
import RecordsTable from "./components/table/RecordsTable";
import LoginDialog from "./components/login/LoginDialog";
import Card from "./components/card/Card";

import "./App.css";

export default class App extends Component {
  private store: Store = new Store();

  componentDidMount() {
    this.changeSearchString = this.changeSearchString.bind(this);
    this.store.loadData();
  }

  changeSearchString(event: KeyboardEvent<HTMLInputElement>) {
    if (event && event.key === "Enter") {
      this.store.changeSearchString((event.target as HTMLInputElement).value);
    }
  }

  render() {
    return (
      <Router>
        <Route
          path="/"
          exact
          render={_ => (
            <Observer>
              {() => (
                <div className="App">
                  <RecordsTable
                    changeSearchString={this.changeSearchString}
                    store={this.store}
                  />
                </div>
              )}
            </Observer>
          )}
        />
        <Route path="/card/:caseUid" component={Card} />
      </Router>
    );
  }
}
