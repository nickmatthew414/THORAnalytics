import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { withStyles, makeStyles } from '@material-ui/core/Styles'
import { toMillionsString, toPercentString, toPriceString } from '../../library/library';


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

    const getStyledTableCell = (value, key) => {
      if (key === "Pool Depth" || key === "Daily Volume") {
        if (key === "Pool Depth") value *= 2;  // pool depth is non-rune + rune
        value = toMillionsString(value);
      }
      if (key === "Pool APY") {
        value = toPercentString(value);
      }
      if (key === "Price") {
        value = toPriceString(value);
      }
        return <StyledTableCell align="left" key={key}>{value}</StyledTableCell>
    }

    const getRowData = (data, index) => {
      let row = [];
        for (const key of Object.keys(data)) {
          row.push(
            getStyledTableCell(data[key], key)
          )
        }
      return <StyledTableRow key={index}>{row}</StyledTableRow>
    }

    return (
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {props.tableData && Object.keys(props.tableData[0]).map((header, index) => (
                            getStyledTableCell(header, index)
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.tableData && props.tableData.map((data, index) => (
                    getRowData(data, index)
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}