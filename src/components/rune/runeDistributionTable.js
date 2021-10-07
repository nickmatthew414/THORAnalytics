import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { toPercentString } from '../../library/library';
import InfoIcon from '../infoIcon';
import "../../styles/sass/main.scss";
import * as Constants from "../../constants";


const useStyles = makeStyles({
    paper: {
        backgroundColor: 'transparent',
    },
    tableCell: {
        fontSize: ".8vw",
        padding: "2px 5px",
        color: "white",
    }
  });


  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);


export default function RuneDistributionTable(props) {

    const classes = useStyles();

    // return third row if window width is above 700px
    const returnTableCells = () => {
        if (props.windowSize.width > Constants.tableInfoColumnThreshold) {
           return (
            <TableRow>
            <TableCell className={classes.tableCell} >Asset</TableCell>
            <TableCell className={classes.tableCell} align="left">Percentage</TableCell>
            <TableCell />
            </TableRow>
           )
        }
        return (
                <TableRow>
                <TableCell className={classes.tableCell} >Asset</TableCell>
                <TableCell className={classes.tableCell} align="left">Percentage</TableCell>
                </TableRow> 
        )
    }

    const returnInfoIcons = (data) => {
        if (props.windowSize.width > Constants.tableInfoColumnThreshold) {
            return (<TableCell>
            <InfoIcon info={data.info} fontSize="12px" />
            </TableCell>)
        }
        return <div></div>

    }

    const rowMaker = (data, i) => {

        return (
            <TableRow key={i}>
                <TableCell className={classes.tableCell} component="th" scope="row">
                <div className="infoIcon">
                    <FiberManualRecordIcon style={{fill: data.color, width: "1vw", height: "1vw"}}></FiberManualRecordIcon>
                    &nbsp;{data.label}
                </div>
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                    {toPercentString(data.value)}
                </TableCell>
                {returnInfoIcons(data)}
            </TableRow>
        )
        
    }

    return (
        <TableContainer className={classes.paper} component={Paper}>
        <Table>
            <TableHead>
                {returnTableCells()}
            </TableHead>
            <TableBody>
            {props.tableData.map((data, i) => (
                rowMaker(data, i)
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}