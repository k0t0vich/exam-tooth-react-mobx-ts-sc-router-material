import React from "react";
import LoginHeaderProps from "./LoginHeaderProps";

export default class LoginFooter extends React.Component<LoginHeaderProps> {
  constructor(props: LoginHeaderProps) {
    super(props);
  }

  render() {
    return (
      <>
        <p>{this.props.userName}</p>;
      </>
    );
  }
}
