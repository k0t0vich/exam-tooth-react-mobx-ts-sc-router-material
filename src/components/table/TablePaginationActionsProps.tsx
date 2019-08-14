import React from 'react';
export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => void;
}
