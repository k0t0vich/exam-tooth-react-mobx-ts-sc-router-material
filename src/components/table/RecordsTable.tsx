import React, { KeyboardEvent, Component } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

import TablePaginationActions from "./TablePaginationActions";
import RecordsTableProps from "./RecordsTableProps";
import { StyledTableCell } from "./StyledTableCell";
import RecordData, {
  RECORD_DATA_KEYS,
  getRecordProperty
} from "../../data/RecordData";

@inject("store")
@observer
export default class RecordsTable extends Component<RecordsTableProps> {
  handleChangePage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) {
    this.props.store!.tableData.setPage(newPage);
  }

  handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.props.store!.tableData.setRowsPerPage(
      parseInt(event.target.value, 10)
    );
    this.props.store!.tableData.setPage(0);
  }

  selectStringFragment(
    str: string,
    searchString: string = this.props.store!.searchString
  ) {
    const arr = str.split(searchString);
    if (arr.length === 1) return str;
    var last: number = arr.length - 1;
    return arr.map((value, index) => (
      <span key={index}>
        {value}
        <span style={{ color: "darkblue" }}>
          <b>{index < last && searchString}</b>
        </span>
      </span>
    ));
  }

  changeSearchString(event: KeyboardEvent<HTMLInputElement>) {
    if (event && event.key === "Enter") {
      this.props.store!.changeSearchString(
        (event.target as HTMLInputElement).value
      );
    }
  }

  render() {
    //console.log("render");
    var records = this.props.store!.filteredRecords;
    return (
      <Paper>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="search-record"
            label="SEARCH FILTER [Input and press Enter]"
            name="search-record"
            autoFocus
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
              this.changeSearchString(event)
            }
          />
          <Table>
            <TableHead>
              <TableRow>
                {RECORD_DATA_KEYS.map((key: string) => (
                  <StyledTableCell align="left" key={key}>
                    {key}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody >
              {this.props.store!.visibleRecords.map((record: RecordData) => (
                <TableRow key={record.caseUid}>
                  {RECORD_DATA_KEYS.map((key: string, index: number) => {
                    return index === 0 ? (
                      <TableCell component="th" scope="row" key={key}>
                        <Link to={"card/:" + record.caseUid}>
                          {this.selectStringFragment(
                            getRecordProperty(record, key)
                          )}
                        </Link>
                      </TableCell>
                    ) : (
                      <TableCell align="left">
                        {this.selectStringFragment(
                          getRecordProperty(record, key)
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter style={{ width: "100%", left: 10 }}>
              <TableRow key="pagination">
                <TablePagination
                  rowsPerPageOptions={
                    this.props.store!.tableData.paginationValues
                  }
                  colSpan={3}
                  count={records.length}
                  rowsPerPage={this.props.store!.tableData.rowsPerPage}
                  page={this.props.store!.tableData.page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true
                  }}
                  onChangePage={(
                    event: React.MouseEvent<
                      HTMLButtonElement,
                      MouseEvent
                    > | null,
                    newPage: number
                  ) => this.handleChangePage(event, newPage)}
                  onChangeRowsPerPage={(
                    event: React.ChangeEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => this.handleChangeRowsPerPage(event)}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}
