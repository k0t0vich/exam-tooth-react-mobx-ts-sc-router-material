import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import LoginDialogProps from "./LoginDialogProps";
import LoginDialogState from "./LoginDialogState";
import { inject } from "mobx-react";

@inject("store")
export default class LoginDialog extends Component<
  LoginDialogProps,
  LoginDialogState
> {
  // TODO may be move to context or state?
  login: string = "";
  password: string = "";

  constructor(props: LoginDialogProps) {
    super(props);
    this.state = { showPassword: false };
    this.showPasswordCheckBoxOnChange = this.showPasswordCheckBoxOnChange.bind(
      this
    );
    this.loginButtonOnClick = this.loginButtonOnClick.bind(this);
  }

  showPasswordCheckBoxOnChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    this.setState({ showPassword: checked });
  }

  loginButtonOnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //SIMULATE SERVER CHECK
    if (this.login === "root" && this.password === "admin") {
      this.props.store!.saveUser(this.login);
    } else {
      alert("login/password incorrect");
    }
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="App">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="current-login"
              label="login"
              name="current-login"
              autoFocus
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                (this.login = event.target.value)
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={this.state.showPassword ? "input" : "password"}
              id="password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                (this.password = event.target.value)
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="showPasswordCheckBox"
                  color="primary"
                  onChange={this.showPasswordCheckBoxOnChange}
                />
              }
              label="Show password"
            />
            <Button
              id="loginButton"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.loginButtonOnClick}
            >
              Login
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}
