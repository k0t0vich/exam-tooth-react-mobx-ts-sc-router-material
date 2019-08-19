import { observer, Provider } from "mobx-react";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import Card from "./components/card/Card";
import RecordsTable from "./components/table/RecordsTable";
import LoginDialog from "./components/login/LoginDialog";
import LoginHeader from "./components/login/LoginHeader";
import Store from "./data/Store";

import "./App.css";

@observer
export default class App extends Component {
  store: Store = new Store();

  componentDidMount() {
    if (this.store.isLogin) this.store.loadData();
  }

  render() {
    return this.store.isLogin ? (
      this.store.dataLoaded ? (
        <div>
          <Provider store={this.store}>
            <LoginHeader userName={this.store.user} />
            <Router>
              <Switch>
                <Route path="/" exact component={RecordsTable} />
                <Route path="/card/:caseUid" exact component={Card} />
                <Route component={RecordsTable} />
              </Switch>
            </Router>
          </Provider>
        </div>
      ) : (
        <div id="loading" className="App">
          <CircularProgress size="100px" />
          <div>loading data</div>
        </div>
      )
    ) : (
      <Provider store={this.store}>
        <LoginDialog />
      </Provider>
    );
  }
}
