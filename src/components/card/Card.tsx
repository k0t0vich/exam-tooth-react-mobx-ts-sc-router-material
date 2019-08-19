import React, { Component } from "react";
import { CardProps } from "./CardProps";
import { inject } from "mobx-react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button
} from "@material-ui/core";
import { StyledTableCell } from "../table/StyledTableCell";
import { RECORD_DATA_KEYS, getRecordProperty } from "../../data/RecordData";
import { Redirect, Link } from "react-router-dom";

function BackLink() {
  return (
    <Link to="/">
      <Button style={{ margin: 10 }}>Back to table</Button>
    </Link>
  );
}

@inject("store")
export default class Card extends Component<CardProps> {
  render() {
    //HACK - remove ':' from matched params
    var caseUid = this.props.match.params.caseUid!.slice(1);
    var recordData = this.props.store!.getRecordsByCaseId(caseUid);
    return recordData ? (
      <Paper>
        <BackLink />
        <Table>
          <TableBody>
            <TableRow>
              {RECORD_DATA_KEYS.map(key => (
                <TableRow key={key}>
                  <StyledTableCell component="th" scope="row">
                    {key}
                  </StyledTableCell>
                  <TableCell scope="row">
                    {getRecordProperty(recordData, key)}
                  </TableCell>
                </TableRow>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    ) : (
      <div className="App">
        <br />
        Unknown caseUid {caseUid}
        <br />
        <BackLink />
      </div>
    );
  }
}
