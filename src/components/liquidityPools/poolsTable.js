import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { withStyles, makeStyles } from '@material-ui/core/Styles'


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#17A07B',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      color: "white"
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: "#3B3F43",
      },
      '&:nth-of-type(even)': {
        backgroundColor: "#37373c"
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles({
      table: {
        width: "100%",
      },
    });


export default function PoolsTable(props) {

    const classes = useStyles();
    let data = [1, 2, 3]
    let headerLabels = ["Asset", "Pool Depth", "Asset Price", "Pool APY"]

    const getStyledTableCell = (value, index) => {
        return <StyledTableCell align="left" key={index}>{value}</StyledTableCell>
    }

    const getRowData = (value, index) => {
        return (
            <StyledTableRow key={index}>{value}</StyledTableRow>
        )
    }

    return (
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {props.tableData && headerLabels.map((header, index) => (
                            getStyledTableCell(header, index)
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData && data.map((value, index) => (
                    getRowData(value, index)
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}