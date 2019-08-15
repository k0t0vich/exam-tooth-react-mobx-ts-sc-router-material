import React, { KeyboardEvent } from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from './TablePaginationActions';
import RecordsTableProps from './RecordsTableProps';

export const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
    minHeight:200
  },
  tableWrapper: {
    overflowX: 'auto'
  },
}),
);

export default function RecordsTable(props: RecordsTableProps) {
  const records = props.records;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function selectStringFragment(str:string,search:string = props.searchString){
    const arr = str.split(search);
    if (arr.length === 1) return (str);
    var last:number = arr.length - 1;
    return (
      arr.map ((value,index) => 
        <span key={index}>
          {value}
          <span style={{color:"red"}}>
            <b>{index < last && search}</b>
          </span>
        </span>
      )
    )
  }
  var paginationValues = [5,10,20,50,100,200,500];
  paginationValues = paginationValues.filter((value) => value < records.length);
  paginationValues.push(records.length);
  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        filter
        <input 
          style={{padding:2, margin: 10}}
          onKeyDown={(event:KeyboardEvent<HTMLInputElement>) => props.changeSearchString(event)}
        />
        <Table className={classes.table}>
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
            {records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(record => (
              <TableRow key={record.caseUid}>
                <TableCell component="th" scope="row" >{selectStringFragment(record.reference)}</TableCell>
                <TableCell align="left">{selectStringFragment(record.caseUid)}</TableCell>
                <TableCell align="left">{selectStringFragment(record.accountId)}</TableCell>
                <TableCell align="left">{selectStringFragment(record.creationDate)}</TableCell>
                <TableCell align="left">{selectStringFragment(record.publicId)}</TableCell>
                <TableCell align="left">{selectStringFragment(record.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter style={{width:"100%", left:10}}>
            <TableRow key="pagination">
              <TablePagination
                rowsPerPageOptions={paginationValues}
                colSpan={3}
                count={records.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
}
