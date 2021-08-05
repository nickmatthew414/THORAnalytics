import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import Divider from '@material-ui/core/Divider';
import { withStyles, makeStyles } from '@material-ui/core/Styles';
import { shortenedAddress, torToRune } from '../../library/library';

const StyledTableCell = withStyles((theme) => ({
    head: {
      // backgroundColor: theme.palette.common.black,
      backgroundColor: '#17A07B',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles({
      table: {
        width: "100%",
      },
    });

export default function NodeTable(props) {

    const classes = useStyles();
    let tableHeaders = ["Node Address", "Bond", "Version", "IP Address"];

    const getStyledTableCell = (text, columnText) => {
        if (columnText === "node_address") {
            text = shortenedAddress(text);
        } else if (columnText === "bond") {
            text = Math.round(torToRune(text)).toLocaleString();
        }
        return <StyledTableCell align="left" key={columnText}>{text}</StyledTableCell>
    }

    const getRowData = (address, index) => {
        let row = []
        let columnValues = ["node_address", "bond", "version", "ip_address"];
        for (let i=0; i<columnValues.length; i++) {
            row.push(
                getStyledTableCell(address[columnValues[i]], columnValues[i])
            )
        }
        return (
            <StyledTableRow key={index}>{row}</StyledTableRow>
        )
    }

    return (
        <Card variant="outlined" style={{ borderColor: "#1BE6C8", backgroundColor: "#17A07B", marginTop: "2%"}}>
             <CardHeader title={props.title} style={{color: "white", textAlign: "center"}} 
                        titleTypographyProps={{variant:'subtitle2'}}></CardHeader>
            {/* <Divider style={{width: "100%", height: "1px", backgroundColor: "white", borderWidth: "10px"}}/> */}
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {props.nodeData && tableHeaders.map((header, index) => (
                            getStyledTableCell(header, index)
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.nodeData && props.nodeData.map((addressData, index) => (
                    getRowData(addressData, index)
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Card>
    )
}