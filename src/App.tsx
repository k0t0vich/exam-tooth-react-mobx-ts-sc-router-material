import React, { Component, KeyboardEvent } from "react";
import { Provider, observer } from "mobx-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Store from "./data/Store";
import RecordsTable from "./components/table/RecordsTable";
import LoginDialog from "./components/login/LoginDialog";
import Card from "./components/card/Card";

import "./App.css";

@observer
export default class App extends Component<{}, {}> {
  store: Store;

  constructor(props: {}) {
    super(props);
    this.store = new Store();
  }

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
            <Provider store={this.store}>
              <RecordsTable />
            </Provider>
          )}
        />
        <Route path="/card/:caseUid" component={Card} />
      </Router>
    );
  }
}
