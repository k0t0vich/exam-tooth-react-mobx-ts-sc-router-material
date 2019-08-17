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
    this.store.loadData();
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
