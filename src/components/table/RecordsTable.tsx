import React, { KeyboardEvent, Component } from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePaginationActions from "./TablePaginationActions";
import RecordsTableProps from "./RecordsTableProps";
import { Link } from "react-router-dom";
import { observer, inject, Observer } from "mobx-react";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

@inject("store")
@observer
export default class RecordsTable extends Component<RecordsTableProps> {
  classes = { root: "App", tableWrapper: "App", table: "App" };
  constructor(props: RecordsTableProps) {
    super(props);
  }

  componentDidMount() {
    this.changeSearchString = this.changeSearchString.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) {
    this.props.store!.tableData.setPage(newPage);
  }

  handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.props.store!.tableData.setRowsPerPage(parseInt(event.target.value, 10));
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
        <span style={{ color: "red" }}>
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
    console.log("render");
    var records = this.props.store!.filteredRecords; 
    return (
      <Paper>
        <div>
          {"filtered: "+ records.length + " " + this.props.store!.visibleRecords.length}
          <input
            style={{ padding: 2, margin: 10 }}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
              this.changeSearchString(event)
            }
          />
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>reference</StyledTableCell>
                <StyledTableCell align="left">caseUid</StyledTableCell>
                <StyledTableCell align="left">accountId</StyledTableCell>
                <StyledTableCell align="left">creationDate</StyledTableCell>
                <StyledTableCell align="left">publicId</StyledTableCell>
                <StyledTableCell align="left">status</StyledTableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {
                  this.props.store!.visibleRecords.map(record => (
                    <TableRow key={record.caseUid}>
                      <TableCell component="th" scope="row">
                        <Link to={"card/:" + record.caseUid}>
                          {this.selectStringFragment(record.reference)}
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        {this.selectStringFragment(record.caseUid)}
                      </TableCell>
                      <TableCell align="left">
                        {this.selectStringFragment(record.accountId)}
                      </TableCell>
                      <TableCell align="left">
                        {this.selectStringFragment(record.creationDate)}
                      </TableCell>
                      <TableCell align="left">
                        {this.selectStringFragment(record.publicId)}
                      </TableCell>
                      <TableCell align="left">
                        {this.selectStringFragment(record.status)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            <TableFooter style={{ width: "100%", left: 10 }}>
              <TableRow key="pagination">
                <TablePagination
                  rowsPerPageOptions={this.props.store!.tableData.paginationValues}
                  colSpan={3}
                  count={records.length}
                  rowsPerPage={this.props.store!.tableData.rowsPerPage}
                  page={this.props.store!.tableData.page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
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
