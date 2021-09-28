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
import Tooltip, { tooltipClasses } from '@material-ui/core/Tooltip';
import { toPercentString } from '../../library/library';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Zoom from '@material-ui/core/Zoom';

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

    const rowMaker = (data, i) => {

        return (
            <TableRow key={i}>
                <TableCell className={classes.tableCell} component="th" scope="row">
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <FiberManualRecordIcon style={{fill: data.color, width: "1vw", height: "1vw"}}></FiberManualRecordIcon>
                    &nbsp;{data.label}
                </div>
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                    {toPercentString(data.value)}
                </TableCell>
                <TableCell style={{width: "10%"}}>
                    <LightTooltip title={data.info} placement="right" TransitionComponent={Zoom}>
                        <InfoOutlinedIcon style={{fontSize: "12px", color: "yellow"}} />
                    </ LightTooltip>
                </TableCell>
            </TableRow>
        )
        
    }

    return (
        <TableContainer className={classes.paper} component={Paper}>
        <Table>
            <TableHead>
            <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Asset</TableCell>
                <TableCell className={classes.tableCell} align="left">Percentage</TableCell>
                <TableCell />
            </TableRow>
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