import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
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
    // for calculating the depth of the rest of the pools
    let otherDepth = props.totalPooledRune;

    const rowMaker = (name, i) => {
        let color = props.colors[i];

        const getDepth = (depth) => {
            if (name === "Other") {
                return toMillions(otherDepth * props.runePrice * 2).toFixed(2) + "M";
            }
            // decrease otherDepth by depth of this pool
            otherDepth = otherDepth - depth / props.runePrice;
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
                    <FiberManualRecordIcon style={{fill: color, width: "1vw", height: "1vw"}}></FiberManualRecordIcon>&nbsp;{name}
                </div>
                </TableCell>
                <TableCell className={classes.tableCell} align="left">{getDepth(props.assetTotalValues[i])}</TableCell>
                <TableCell className={classes.tableCell} align="left">{getAPYs(props.assetAPYs[i])}</TableCell>
            </TableRow>
        )
        
    }

    return (
        <TableContainer className={classes.paper} component={Paper}>
        <Table>
            <TableHead>
            <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Asset</TableCell>
                <TableCell className={classes.tableCell} align="left">Depth</TableCell>
                <TableCell className={classes.tableCell} align="left">APY</TableCell>
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

