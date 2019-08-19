import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
export const StyledTableCell = withStyles((theme: Theme) => createStyles({
  head: {
    backgroundColor: "darkblue",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    backgroundColor: "darkblue",
    color: theme.palette.common.white,
    width:"50%"
  }
}))(TableCell);
