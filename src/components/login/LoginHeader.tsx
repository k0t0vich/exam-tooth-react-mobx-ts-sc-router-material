import React from "react";
import LoginHeaderProps from "./LoginHeaderProps";
import { Button } from "@material-ui/core";
import { inject } from "mobx-react";

@inject("store")
export default class LoginHeader extends React.Component<LoginHeaderProps> {
  render() {
    return (
      <div className="login-header-container App-header">
        <div className="user-name">
          <p>You logged as {this.props.store!.user}</p>
        </div>
        <div className="logout">
          <Button
            variant="contained"
            color="primary"
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              this.props.store!.clearUser()
            }
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
}
