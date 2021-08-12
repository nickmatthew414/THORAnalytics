import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { toMillions, toPercent } from '../../library/library';

const useStyles = makeStyles({
    paper: {
        backgroundColor: 'transparent',
    },
    table: {
      width: 50,
      color: 'white',
    },
    tableCell: {
        fontSize: ".8vw",
        padding: "2px 10px",
        color: "white"
    },
    tableRow: {
        height: 20,
    }
  });


export default function PoolSizesTable(props) {

    const classes = useStyles();
    let rows = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    const rowMaker = (name, i) => {
        let color = props.colors[i];

        const getPrices = (price) => {
            if (name === "Other") {
                return "---"
            }
            return "$" + Number(price).toFixed(2);
        }

        const getDepth = (depth) => {
            if (name === "Other") {
                return "---"
            }
            return toMillions(depth * 2).toFixed(2) + "M";
        }

        const getAPYs = (apy) => {
            if (name === "Other") {
                return "---"
            }
            return toPercent(apy).toFixed(2) + "%";
        }

        return (
            <TableRow key={i}>
                <TableCell className={classes.tableCell} component="th" scope="row">
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <li style={{color: color}}></li>{name}
                </div>
                </TableCell>
                <TableCell className={classes.tableCell} align="left">{getDepth(props.assetTotalValues[i])}</TableCell>
                <TableCell className={classes.tableCell} align="left">{getPrices(props.assetPrices[i])}</TableCell>
                <TableCell className={classes.tableCell} align="left">{getAPYs(props.assetAPYs[i])}</TableCell>
            </TableRow>
        )
        
    }

    return (
        <TableContainer className={classes.paper} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Asset</TableCell>
                <TableCell className={classes.tableCell} align="center">Depth</TableCell>
                <TableCell className={classes.tableCell} align="center">Price</TableCell>
                <TableCell className={classes.tableCell} align="center">APY</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.names.map((name, i) => (
                rowMaker(name, i)
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

