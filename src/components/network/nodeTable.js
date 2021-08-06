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
import annotationPlugin from 'chartjs-plugin-annotation';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#17A07B',
    // backgroundColor: "#0f674d",
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
        // backgroundColor: theme.palette.action.hover,
        backgroundColor: "#3B3F43",
      },
      '&:nth-of-type(even)': {
        //   backgroundColor: "#2c2c30",
        backgroundColor: "#37373c"
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
        <Card variant="outlined" style={{ borderColor: "#1BE6C8", backgroundColor: "#0f674d", marginTop: "2%"}}>
             <CardHeader title={props.title} style={{color: "white" , textAlign: "center"}} 
                        titleTypographyProps={{variant:'subtitle2'}}></CardHeader>
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