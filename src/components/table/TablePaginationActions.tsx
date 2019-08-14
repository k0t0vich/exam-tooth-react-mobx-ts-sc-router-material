import React from 'react';
import {makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TablePaginationActionsProps } from './TablePaginationActionsProps';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

export default function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
  function handleFirstPageButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, 0);
  }
  function handleBackButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, page - 1);
  }
  function handleNextButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, page + 1);
  }
  function handleLastPageButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }
  return (<div className={classes.root}>
    <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
      {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
    </IconButton>
    <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
    </IconButton>
    <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </IconButton>
    <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
      {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
    </IconButton>
  </div>);
}
