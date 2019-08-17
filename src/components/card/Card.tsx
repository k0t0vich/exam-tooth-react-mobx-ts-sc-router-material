import React from "react";
import { RouteComponentProps } from "react-router-dom";
import CardPropsMatchParams from "./CardPropsMatchParams";

export default class Card extends React.Component<RouteComponentProps<CardPropsMatchParams>,{}> {
  constructor(props: RouteComponentProps<CardPropsMatchParams>) {
    super(props);
    console.log("Card");
  }

  render() {
    console.log("Card#render");
    return <p>CARD: caseUid={this.props.match.params.caseUid}</p>;
  }
}
